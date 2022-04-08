import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Text, useTheme } from "native-base";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { getVerificationRequests } from "../../FirebaseInterface";
import { AppContext } from "../../AppContext";
import "../../Routes/Portal.css";
import "../../Routes/Checkout.css";
import {
  FaClock,
  FaDollarSign,
  FaFile,
  FaMoneyBillWave,
  FaPhoneAlt,
} from "react-icons/all";
import { dateDiff } from "../DataEntryDashboard/ManageListings";

const VerificationRequestsView = () => {
  const { user, setError } = useContext(AppContext);
  const [requests, setRequests] = useState();
  const [lastVisible, setLastVisible] = useState();
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
  return (
    <div style={styles.backgroundStyle} className="p-5">
      <Container className="p-3">
        <Text color="secondary.800" fontWeight={300} fontSize={24}>
          Verification Requests
        </Text>
      </Container>
      <Container>
        <div className="py-4 d-flex flex-row justify-content-between align-items-center">
          <Row
            className="justify-content-center justify-content-md-start align-items-center"
            style={{ flex: 1 }}
          >
            {requests === undefined ? (
              <Col
                style={{ borderRadius: 8 }}
                className="animate-link-shadow p-0 mx-3"
              >
                <div style={styles.containerStyle}>
                  <Spinner color="primary.400" />
                </div>
              </Col>
            ) : requests === [] ? (
              <Text>No more requests to do!</Text>
            ) : (
              requests.map((request) => (
                <Col
                  xs={10}
                  md={6}
                  lg={4}
                  style={{ borderRadius: 8 }}
                  className="animate-link-shadow p-0"
                >
                  <div style={styles.containerStyle}>
                    <div style={styles.headerRow}>
                      <div style={styles.requestHeader}>
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={(props) =>
                            renderTooltip({ ...props, status: request.status })
                          }
                        >
                          <div
                            className="circle"
                            style={{
                              backgroundColor:
                                request.status === "pendingPayment"
                                  ? theme.colors.primary["200"]
                                  : theme.colors.muted["300"],
                              marginRight: 20,
                            }}
                          >
                            {request.status === "paymentReceived" ? (
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
                          <Text color="muted.500">
                            {dateDiff(request.created)}
                          </Text>
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
                          <Text color="secondary.800">Funding passed</Text>
                          <Text fontSize={12} color="muted.500">
                            {request.combinedBalances}
                          </Text>
                        </div>
                      </div>
                      <div style={styles.contentRow}>
                        <div
                          className="circle"
                          style={{
                            backgroundColor: theme.colors.muted["200"],
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
                      <div style={styles.footerButtons}>
                        <Button
                          mx={2}
                          flex={1}
                          variant="subtle"
                          colorScheme="red"
                        >
                          Deny
                        </Button>
                        <Button mx={2} flex={1} variant="subtle">
                          Approve
                        </Button>
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
};

export default VerificationRequestsView;
