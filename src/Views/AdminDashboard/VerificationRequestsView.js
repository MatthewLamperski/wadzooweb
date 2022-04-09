import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Text, useTheme } from "native-base";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {
  approveVerificationRequest,
  denyVerificationRequest,
  getVerificationRequests,
} from "../../FirebaseInterface";
import { AppContext } from "../../AppContext";
import "../../Routes/Portal.css";
import "../../Routes/Checkout.css";
import {
  FaCheck,
  FaClock,
  FaDollarSign,
  FaFile,
  FaMoneyBillWave,
  FaPhoneAlt,
} from "react-icons/all";
import { dateDiff } from "../DataEntryDashboard/ManageListings";
import { AdvancedBadge, IntermediateBadge } from "../BadgeStatus";
import { toast } from "react-toastify";

const VerificationRequestsView = () => {
  const { user, setError } = useContext(AppContext);
  const [requests, setRequests] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [loadingButtons, setLoadingButtons] = useState({
    approved: [],
    denied: [],
  });
  const theme = useTheme();
  const getFirstRequestsBatch = () => {
    getVerificationRequests()
      .then((result) => {
        setRequests(result.requests);
        setLastVisible(result.lastVisible);
      })
      .catch((err) => {
        console.log(err);
        setError({
          title: "Something went wrong.",
          message: "We couldn't get any requests.",
        });
      });
  };
  const getMoreRequests = () => {
    getVerificationRequests(lastVisible)
      .then((result) => {
        setRequests((prevState) => [...prevState, ...result.requests]);
        setLastVisible(result.lastVisible);
      })
      .catch((err) => {
        console.log(err);
        setError({
          title: "Something went wrong.",
          message: "We couldn't get any requests.",
        });
      });
  };
  useEffect(() => {
    getFirstRequestsBatch();
  }, []);
  const renderTooltip = (props) => (
    <Tooltip {...props}>
      {props.status === "paymentReceived"
        ? "Payment received"
        : "Payment pending"}
    </Tooltip>
  );
  const renderDisabledTooltip = (props) => (
    <Tooltip {...props}>This user has not paid for verification yet.</Tooltip>
  );
  const handleApproveRequest = (idx) => {
    setLoadingButtons((prevState) => ({
      ...prevState,
      approved: [...prevState.approved, idx],
    }));
    approveVerificationRequest(requests[idx])
      .then(() => {
        setRequests((prevState) => [
          ...prevState.slice(0, idx),
          ...prevState.slice(idx + 1),
        ]);
        setLoadingButtons((prevState) => ({
          ...prevState,
          approved: [
            ...prevState.approved.slice(0, prevState.approved.indexOf(idx)),
            ...prevState.approved.slice(prevState.approved.indexOf(idx) + 1),
          ],
        }));
        toast.success("Successfully upgraded user.");
      })
      .catch((err) =>
        setError({
          title: "Something went wrong..",
          message: `Here is the error: ${err}`,
        })
      );
  };
  const handleDenyRequest = (idx) => {
    setLoadingButtons((prevState) => ({
      ...prevState,
      denied: [...prevState.denied, idx],
    }));
    denyVerificationRequest(requests[idx])
      .then(() => {
        setRequests((prevState) => [
          ...prevState.slice(0, idx),
          ...prevState.slice(idx + 1),
        ]);
        setLoadingButtons((prevState) => ({
          ...prevState,
          denied: [
            ...prevState.denied.slice(0, prevState.denied.indexOf(idx)),
            ...prevState.denied.slice(prevState.denied.indexOf(idx) + 1),
          ],
        }));
        toast.success("Successfully denied user.");
      })
      .catch((err) =>
        setError({
          title: "Something went wrong..",
          message: `Here is the error: ${err}`,
        })
      );
  };
  return (
    <div style={styles.backgroundStyle} className="p-5">
      <Container className="p-3">
        <Text color="secondary.800" fontWeight={300} fontSize={24}>
          Verification Requests
        </Text>
      </Container>
      <Container>
        <div className="py-4 flex-row justify-content-between align-items-center">
          <Row className="justify-content-center justify-content-lg-start align-items-center">
            {requests === undefined ? (
              <Col
                style={{ borderRadius: 8 }}
                className="animate-link-shadow p-0 mx-3"
              >
                <div style={styles.containerStyle}>
                  <Spinner color="primary.400" />
                </div>
              </Col>
            ) : requests.length === 0 ? (
              <div style={styles.noneLeftBox}>
                <div
                  className="circle"
                  style={{
                    backgroundColor: theme.colors.primary["200"],
                  }}
                >
                  <FaCheck color="white" />
                </div>
                <div className="d-flex flex-column justify-content-start align-items-start px-3">
                  <Text color="secondary.800" fontSize={24} fontWeight={300}>
                    No more requests to do!
                  </Text>
                  <Text color="muted.400">Check back later for more.</Text>
                </div>
              </div>
            ) : (
              requests.map((request, idx) => (
                <Col xs={10} lg={6} xl={4}>
                  <div
                    style={{ borderRadius: 8 }}
                    className="animate-link-shadow my-2"
                  >
                    <div style={styles.containerStyle}>
                      <div
                        style={{
                          backgroundColor: theme.colors.muted["400"] + "30",
                          borderRadius: 8,
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
                        }}
                        className="d-flex p-3 mb-4 flex-row justify-content-between align-items-center"
                      >
                        <Text color="muted.500">Requesting:</Text>
                        <div className="d-flex">
                          {request.badge === "intermediate" ? (
                            <IntermediateBadge />
                          ) : (
                            <AdvancedBadge />
                          )}
                        </div>
                      </div>
                      <div style={styles.headerRow}>
                        <div style={styles.requestHeader}>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={(props) =>
                              renderTooltip({
                                ...props,
                                status: request.status,
                              })
                            }
                          >
                            <div
                              className="circle"
                              style={{
                                backgroundColor:
                                  request.status === "paymentReceived"
                                    ? theme.colors.primary["200"]
                                    : theme.colors.muted["300"],
                                marginRight: 20,
                              }}
                            >
                              {request.status === "pendingPayment" ? (
                                <FaClock />
                              ) : (
                                <FaDollarSign />
                              )}
                            </div>
                          </OverlayTrigger>

                          <div style={styles.headerText}>
                            <Text
                              color="secondary.800"
                              fontSize={16}
                              fontWeight={300}
                            >
                              {request.firstName} {request.lastName}
                            </Text>
                            <div className="d-flex flex-row justify-content-center align-items-start">
                              <Text color="muted.500">
                                {dateDiff(request.created)}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="subtle"
                          onPress={() =>
                            (window.location.href = `mailto:${request.email}?subject=Wadzoo Verification Call`)
                          }
                        >
                          Email
                        </Button>
                      </div>
                      <div style={styles.requestContent}>
                        <div style={styles.contentRow}>
                          <div
                            className="circle"
                            style={{
                              backgroundColor: theme.colors.primary["200"],
                              marginRight: 20,
                            }}
                          >
                            <FaMoneyBillWave />
                          </div>
                          <div style={styles.headerText}>
                            {request.combinedBalances === "requestCall" ? (
                              <>
                                <Text color="secondary.800">
                                  Proof of funding:
                                </Text>
                                <Text fontSize={12} color="muted.500">
                                  User wants you to email them to schedule a
                                  call.
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text color="secondary.800">
                                  Funding passed
                                </Text>
                                <Text fontSize={12} color="muted.500">
                                  {request.combinedBalances}
                                </Text>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={styles.contentRow}>
                          <div
                            className="circle"
                            style={{
                              backgroundColor: theme.colors.primary["200"],
                              marginRight: 20,
                            }}
                          >
                            {request.deals === "requestCall" ? (
                              <FaPhoneAlt />
                            ) : (
                              <FaFile />
                            )}
                          </div>
                          <div style={styles.headerText}>
                            <Text color="secondary.800">Proof of deals:</Text>
                            <Text fontSize={12} color="muted.500">
                              {`User ${
                                request.deals === "requestCall"
                                  ? "wants you to email them to schedule a call."
                                  : "uploaded files."
                              }`}
                            </Text>
                          </div>
                        </div>
                        <OverlayTrigger
                          placement={
                            request.status !== "paymentReceived" ? "bottom" : ""
                          }
                          delay={{ show: 0, hide: 400 }}
                          overlay={(props) =>
                            renderDisabledTooltip({
                              ...props,
                              status: request.status,
                            })
                          }
                        >
                          <div style={styles.footerButtons}>
                            <Button
                              isDisabled={request.status !== "paymentReceived"}
                              mx={2}
                              flex={1}
                              variant="subtle"
                              colorScheme="red"
                              onPress={() => handleDenyRequest(idx)}
                            >
                              {loadingButtons.denied.includes(idx) ? (
                                <Spinner />
                              ) : (
                                "Deny"
                              )}
                            </Button>
                            <Button
                              isDisabled={request.status !== "paymentReceived"}
                              mx={2}
                              flex={1}
                              variant="subtle"
                              onPress={() => handleApproveRequest(idx)}
                            >
                              {loadingButtons.approved.includes(idx) ? (
                                <Spinner />
                              ) : (
                                "Approve"
                              )}
                            </Button>
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    backgroundColor: "#EDf0F3",
  },
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  requestContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  contentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 10,
  },
  footerButtons: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  noneLeftBox: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
};

export default VerificationRequestsView;
