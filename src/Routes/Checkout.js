import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  PresenceTransition,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import LoadingScreen from "../Views/LoadingScreen";
import PortalAuth from "./PortalAuth";
import { deviceType } from "./LandingPage";
import "./Checkout.css";
import {
  FaCertificate,
  FaCheck,
  FaEllipsisH,
  FaFile,
  FaTimes,
} from "react-icons/all";
import { usePlaidLink } from "react-plaid-link";
import PlaidLogo from "../Assets/svgs/PlaidLogo.svg";
import { createStripePaymentSession } from "../FirebaseInterface";

const headers = {
  "Content-Type": "application/json",
  Accept: "application.json",
};

const Checkout = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);

  const { service } = useParams();
  const { user, setError, setUser } = useContext(AppContext);
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1, 2]);
  const [linkToken, setLinkToken] = useState(null);
  const [accounts, setAccounts] = useState();
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [hideLink, setHideLink] = useState(false);
  const [request, setRequest] = useState();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const generateToken = async () => {
    try {
      const response = await fetch("https://wadzoo.com/api/create_link_token", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          uid: user.uid,
        }),
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (err) {
      setError({
        title: "We couldn't connect to the internet.",
        message: "Please try again later.",
      });
    }
  };
  useEffect(() => {
    if (user) {
      generateToken();
    }
  }, [user]);
  useEffect(() => {
    if (accounts) {
      if (balanceisApproved(accounts)) {
        setCompletedSteps((prevState) => [...prevState, 1]);
      }
    }
  }, [accounts]);
  const hideOnMobile = () => {
    return deviceType() === "iOS" || deviceType() === "android";
  };
  const balanceisApproved = (accounts) => {
    let threshold = service === "verifyIntermediate" ? 300000 : 500000;
    let balanceSum = Number(
      accounts
        .map((account) => account.balances.current)
        .reduce((partialSum, num) => partialSum + num, 0)
    );
    if (balanceSum >= threshold) {
      return true;
    } else {
      return false;
    }
  };
  const StepOne = () => {
    return (
      <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-start p-4">
        <div className="py-4">
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            href="https://plaid.com"
          >
            <Text underline color="muted.500">
              Asset Verification by
            </Text>
            <img
              src={PlaidLogo}
              style={{
                width: 60,
                height: undefined,
                aspectRatio: "2.625",
                resizeMode: "contain",
                marginLeft: 5,
              }}
            />
          </a>
        </div>
        <PresenceTransition
          visible={!loadingAccounts && accounts === undefined}
          initial={{ opacity: 1 }}
          animate={{ transition: { duration: 500 } }}
          exit={{ opacity: 0 }}
        >
          <div className="d-flex flex-column">
            <Text pb={3} fontWeight={300} fontSize={24} color="secondary.800">
              First, lets verify your funding.
            </Text>
            <Text fontSize={18} color="muted.500">
              Wadzoo uses Plaid to verify you have access to at least $
              {service === "verifyAdvanced" ? "500" : "300"}k. We never access
              your bank account credentials.
            </Text>
          </div>
        </PresenceTransition>
        {loadingAccounts ? (
          <div
            style={{ width: "100%" }}
            className="d-flex flex-column p-4 justify-content-center align-items-center"
          >
            <Spinner size="lg" color="primary.500" />
            <Text my={4} color="primary.700" fontSize={16}>
              Loading balance information...
            </Text>
          </div>
        ) : (
          accounts && (
            <div className="d-flex flex-column pb-3">
              <Text color="secondary.800" fontSize={28} fontWeight={300}>
                Your total assets:{" "}
                {formatter.format(
                  Number(
                    accounts
                      .map((account) => account.balances.current)
                      .reduce((partialSum, num) => partialSum + num, 0)
                  )
                )}
              </Text>
              <Text
                color={
                  balanceisApproved(accounts) ? "primary.600" : "error.500"
                }
                pt={2}
                fontSize={18}
              >
                {balanceisApproved(accounts)
                  ? `Your total balance meets the requirements for the ${
                      service === "verifyAdvanced" ? "Advanced" : "Intermediate"
                    } badge!`
                  : `Your total balance does not meet the requirements for the ${
                      service === "verifyAdvanced" ? "Advanced" : "Intermediate"
                    } badge.`}
              </Text>
              {!balanceisApproved(accounts) && (
                <Text py={3}>
                  {`Wadzoo requires access to at least $${
                    service === "verifyAdvanced" ? "500,000" : "300,000"
                  } for an ${
                    service === "verifyAdvanced" ? "Advanced" : "Intermediate"
                  } badge.`}
                </Text>
              )}
              {balanceisApproved(accounts) && (
                <div className="d-flex pt-2">
                  <Button
                    px={5}
                    rounded="3xl"
                    onPress={() => {
                      setRequest((prevState) => ({
                        ...prevState,
                        combinedBalances: formatter.format(
                          Number(
                            accounts
                              .map((account) => account.balances.current)
                              .reduce((partialSum, num) => partialSum + num, 0)
                          )
                        ),
                      }));
                      completedSteps.includes(2) ? setStep(3) : setStep(2);
                    }}
                  >
                    Next Step
                  </Button>
                </div>
              )}
            </div>
          )
        )}
        {!hideLink && (
          <div
            className="d-flex justify-content-start align-items-center pt-5"
            style={{ width: "100%" }}
          >
            <PlaidLink
              setHideLink={setHideLink}
              setLoadingAccounts={setLoadingAccounts}
              setAccounts={setAccounts}
              linkToken={linkToken}
            />
          </div>
        )}
      </div>
    );
  };

  const StepTwo = () => {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState();
    const [requestSent, setRequestSent] = useState(false);
    let dragCounter = 0;
    const dropRef = useRef(null);

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDragIn = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragging(true);
      }
    };
    const handleDragOut = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter > 0) return;
      setDragging(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setSelectedFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
        dragCounter = 0;
      }
    };
    useEffect(() => {
      let div = dropRef.current;
      div.addEventListener("dragenter", handleDragIn);
      div.addEventListener("dragleave", handleDragOut);
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);

      return () => {
        if (div) {
          div.removeEventListener("dragenter", handleDragIn);
          div.removeEventListener("dragleave", handleDragOut);
          div.removeEventListener("dragover", handleDrag);
          div.removeEventListener("drop", handleDrop);
        }
      };
    }, []);

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          width: "100%",
        }}
        className="d-flex flex-column flex-grow-1 justify-content-start align-items-start p-4"
      >
        <Text pb={3} fontWeight={300} fontSize={24} color="secondary.800">
          Next, let's verify your deals.
        </Text>
        <Text fontSize={14} color="muted.400">
          For the {service === "verifyAdvanced" ? "Advanced" : "Intermediate"}{" "}
          badge, you'll need to have completed{" "}
          {service === "verifyAdvanced" ? "at least 50" : "10-49"} deals. You
          can provide proof by uploading files, or you can get in touch with our
          verification team.
        </Text>
        {(selectedFiles && selectedFiles.length) || requestSent ? (
          <div className="py-4 d-flex flex-column">
            {selectedFiles && selectedFiles.length ? (
              <Text fontWeight={300} fontSize={18} color="secondary.800">
                {selectedFiles.length} Files selected
              </Text>
            ) : (
              <Text fontWeight={300} fontSize={18} color="secondary.800">
                Your request will be sent in the next step!
              </Text>
            )}
            <div className="d-flex">
              <Button
                size="sm"
                px={5}
                rounded="3xl"
                onPress={() => {
                  setRequest((prevState) => ({
                    ...prevState,
                    deals: selectedFiles ? "files" : "requestCall",
                  }));
                  setCompletedSteps((prevState) => [...prevState, 2]);
                  setStep(3);
                }}
              >
                Next Step
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-column justify-content-center align-items-center py-3"
            style={{ width: "100%", height: "100%", flex: 1 }}
          >
            <div
              ref={dropRef}
              className="d-flex flex-column justify-content-center align-items-center m-1"
              style={{
                backgroundColor: dragging
                  ? theme.colors.primary["50"]
                  : "transparent",
                flex: 2,
                width: "100%",
                borderRadius: 8,
                border: `2px dotted ${theme.colors.secondary["800"]}`,
                paddingTop: 40,
                paddingBottom: 40,
                boxShadow: dragging
                  ? "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)"
                  : "none",
              }}
            >
              <FaFile color={theme.colors.secondary["800"]} size={40} />
              {selectedFiles && selectedFiles.length ? (
                <Text p={3} fontSize={14} color="secondary.800">
                  {selectedFiles.length} Files
                </Text>
              ) : (
                <Text p={3} fontSize={14} color="secondary.800">
                  Drop your files here, or{" "}
                  <label
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/png image/jpeg"
                      style={{ display: "none" }}
                      onChange={({ target }) => {
                        setSelectedFiles(target.files);
                      }}
                    />
                    <Text color="primary.600">Browse</Text>
                  </label>
                </Text>
              )}
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-start px-2"
              style={{
                flex: 1,
                width: "100%",
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <Text fontWeight={300} fontSize={16} color="secondary.800">
                Or, you can request a call from our verification team.
              </Text>
              <Text fontSize={14} color="muted.400">
                Our team will reach out via email to schedule a call to verify
                the number of deals you have completed.
              </Text>
              <Button
                my={3}
                rounded="3xl"
                px={5}
                size="sm"
                onPress={() => {
                  setRequestSent(true);
                }}
              >
                Request
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const StepThree = () => {
    const [loading, setLoading] = useState(false);
    return (
      <div
        style={{ width: "100%" }}
        className="d-flex flex-column flex-grow-1 justify-content-center align-items-start p-4"
      >
        <Text pb={3} fontWeight={300} fontSize={22} color="secondary.800">
          Finally, we'll submit all this info.
        </Text>
        <div className="d-flex flex-column justify-content-center align-items-start p-2">
          <div className="d-flex flex-row justify-content-center align-items-start p-2">
            <div
              className="circle"
              style={{
                backgroundColor: completedSteps.includes(1)
                  ? theme.colors.primary["400"]
                  : "whitesmoke",
              }}
            >
              {completedSteps.includes(1) ? (
                <FaCheck color="white" />
              ) : (
                <FaTimes color={theme.colors.error["500"]} />
              )}
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start">
              <Text px={3} fontSize={18} fontWeight={300} color="primary.700">
                Funding
              </Text>
              <Text px={3} fontSize={14} color="muted.400">
                {!completedSteps.includes(1)
                  ? "You must submit your funding verification before you can go further."
                  : "Everything looks good!"}
              </Text>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-start p-2">
            <div
              className="circle"
              style={{
                backgroundColor: completedSteps.includes(2)
                  ? theme.colors.primary["400"]
                  : "whitesmoke",
              }}
            >
              {completedSteps.includes(2) ? (
                <FaCheck color="white" />
              ) : (
                <FaTimes color={theme.colors.error["500"]} />
              )}
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start">
              <Text px={3} fontSize={18} fontWeight={300} color="primary.700">
                Deals
              </Text>
              <Text px={3} fontSize={14} color="muted.400">
                {!completedSteps.includes(2)
                  ? "You must submit proof of deals (or request a call) before you can continue."
                  : "Everything looks good!"}
              </Text>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-start p-2">
            <div
              className="circle"
              style={{
                backgroundColor: theme.colors.muted["100"],
              }}
            >
              <FaEllipsisH color={theme.colors.primary["400"]} />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-start">
              <Text px={3} fontSize={18} fontWeight={300} color="primary.700">
                Submit
              </Text>
              <Text px={3} fontSize={14} color="muted.400">
                The final step is to checkout to submit your verification
                request!
              </Text>
            </div>
          </div>
        </div>
        <Button
          isDisabled={
            !completedSteps.includes(1) || !completedSteps.includes(2)
          }
          px={5}
          rounded="3xl"
          onPress={() => {
            setLoading(true);
            createStripePaymentSession(user.uid, service)
              .then((url) => {
                window.location = url;
              })
              .catch((err) => {
                console.log(err);
                setError({
                  title: "Something went wrong...",
                  message: "Here is the error: " + err,
                });
              });
          }}
        >
          {loading ? <Spinner button /> : "Checkout"}
        </Button>
      </div>
    );
  };

  if (user) {
    return (
      <>
        <PresenceTransition
          visible
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 500 } }}
          exit={{ opacity: 0, transition: { duration: 500 } }}
        >
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: navbarHeight,
            }}
          >
            <Container
              className="py-4"
              style={{
                justifyContent: "start",
                alignItems: "start",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="d-flex flex-row align-items-center">
                <FaCertificate
                  color={theme.colors.secondary["800"]}
                  size={20}
                />
                <Text
                  px={2}
                  py={0}
                  fontSize={18}
                  fontWeight={300}
                  color="secondary.800"
                >
                  {service === "verifyAdvanced" ? "Advanced " : "Intermediate "}
                  Badge Verification
                </Text>
              </div>
            </Container>
            <Container
              style={{ flex: 1 }}
              className="d-inline-flex flex-column justify-content-center align-items-start flex-row px-4 pb-5"
            >
              <div
                className="d-flex flex-row align-items-center justify-content-between p-3"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  backgroundColor: theme.colors.primary["50"] + "70",
                }}
              >
                <div
                  style={{
                    cursor: completedSteps.includes(1) ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!completedSteps.includes(1)) {
                      setStep(1);
                    }
                  }}
                  className="d-flex flex-row align-items-center px-3"
                >
                  <div
                    className="p-2 circle"
                    style={{
                      backgroundColor:
                        completedSteps.includes(1) || step === 1
                          ? theme.colors.primary["400"]
                          : "white",
                      transition: "all .4s ease",
                      WebkitTransition: "all .4s ease",
                      MozTransition: "all .4s ease",
                    }}
                  >
                    <span
                      style={{
                        color:
                          completedSteps.includes(1) || step === 1
                            ? "white"
                            : theme.colors.primary["400"],
                        transition: "all .4s ease",
                        WebkitTransition: "all .4s ease",
                        MozTransition: "all .4s ease",
                      }}
                    >
                      {completedSteps.includes(1) ? (
                        <FaCheck color="white" />
                      ) : (
                        "1"
                      )}
                    </span>
                  </div>
                  {!hideOnMobile() && (
                    <Text pl={2} color="primary.700">
                      Funding
                    </Text>
                  )}
                </div>
                <div
                  className="flex-grow-1"
                  style={{
                    backgroundColor: theme.colors.primary["400"],
                    borderRadius: 3,
                    height: 2,
                  }}
                />
                <div
                  style={{
                    cursor: completedSteps.includes(2) ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!completedSteps.includes(2)) {
                      setStep(2);
                    }
                  }}
                  className="d-flex flex-row align-items-center px-3"
                >
                  <div
                    className="p-2 circle"
                    style={{
                      backgroundColor:
                        completedSteps.includes(2) || step === 2
                          ? theme.colors.primary["400"]
                          : "white",
                      transition: "all .4s ease",
                      WebkitTransition: "all .4s ease",
                      MozTransition: "all .4s ease",
                    }}
                  >
                    <span
                      style={{
                        color:
                          completedSteps.includes(2) || step === 2
                            ? "white"
                            : theme.colors.primary["400"],
                        transition: "all .4s ease",
                        WebkitTransition: "all .4s ease",
                        MozTransition: "all .4s ease",
                      }}
                    >
                      {completedSteps.includes(2) ? (
                        <FaCheck color="white" />
                      ) : (
                        "2"
                      )}
                    </span>
                  </div>
                  {!hideOnMobile() && (
                    <Text pl={2} color="primary.700">
                      Deals
                    </Text>
                  )}
                </div>
                <div
                  className="flex-grow-1"
                  style={{
                    backgroundColor: theme.colors.primary["400"],
                    borderRadius: 3,
                    height: 2,
                  }}
                />
                <div
                  style={{
                    cursor: completedSteps.includes(3) ? "default" : "pointer",
                  }}
                  onClick={() => {
                    if (!completedSteps.includes(3)) {
                      setStep(3);
                    }
                  }}
                  className="d-flex flex-row align-items-center px-3"
                >
                  <div
                    className="p-2 circle"
                    style={{
                      backgroundColor:
                        completedSteps.includes(3) || step === 3
                          ? theme.colors.primary["400"]
                          : "white",
                      transition: "all .4s ease",
                      WebkitTransition: "all .4s ease",
                      MozTransition: "all .4s ease",
                    }}
                  >
                    <span
                      style={{
                        color:
                          completedSteps.includes(3) || step === 3
                            ? "white"
                            : theme.colors.primary["400"],
                        transition: "all .4s ease",
                        WebkitTransition: "all .4s ease",
                        MozTransition: "all .4s ease",
                      }}
                    >
                      {completedSteps.includes(3) ? (
                        <FaCheck color="white" />
                      ) : (
                        "3"
                      )}
                    </span>
                  </div>
                  {!hideOnMobile() && (
                    <Text pl={2} color="primary.700">
                      Submit
                    </Text>
                  )}
                </div>
              </div>
              <div
                className="d-flex align-items-center my-4"
                style={{
                  backgroundColor: theme.colors.primary["50"] + "70",
                  borderRadius: 8,
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {step === 1 ? (
                  <StepOne />
                ) : step === 2 ? (
                  <StepTwo />
                ) : (
                  <StepThree />
                )}
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: "100%" }}
              >
                <a
                  style={{ color: theme.colors.primary["700"] }}
                  href="mailto:development@wadzoo.com?subject=Badge Verification Help"
                >
                  <Text color="primary.700">Need some assistance?</Text>
                </a>
              </div>
            </Container>
          </div>
        </PresenceTransition>
      </>
    );
  } else if (user === null) {
    return (
      <PortalAuth
        text="You need to log into Wadzoo to continue."
        setNavbarTransparent={setNavbarTransparent}
      />
    );
  } else {
    return <LoadingScreen setNavbarTransparent={setNavbarTransparent} />;
  }
};

const PlaidLink = ({
  linkToken,
  setAccounts,
  setLoadingAccounts,
  setHideLink,
}) => {
  const getAccessToken = async (publicToken) => {
    const response = await fetch(
      "https://us-central1-wadzurealty.cloudfunctions.net/getAccessToken",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          publicToken,
        }),
      }
    );
    const data = await response.json();
    return data;
  };
  const { open, ready, error } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      setLoadingAccounts(true);
      const accessTokenData = await getAccessToken(public_token);
      console.log("ACCESS TOKEN DATA", accessTokenData);
      const response = await fetch(
        "https://us-central1-wadzurealty.cloudfunctions.net/getAccounts",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            accessToken: accessTokenData.access_token,
          }),
        }
      );
      let data = await response.json();
      setAccounts(data.accounts);
      setLoadingAccounts(false);
    },
    onExit: (error, metadata) => {
      console.log("error", error, metadata);
      setHideLink(true);
    },
  });
  return (
    <Button
      rounded="3xl"
      px={5}
      onPress={() => {
        console.log(ready);
        open();
      }}
      isDisabled={!ready}
      flexDirection="row"
      display="flex"
    >
      {ready ? (
        <div
          style={{ fontFamily: "Avenir-Heavy" }}
          className="d-flex flex-row justify-content-center align-items-center"
        >
          Verify with
          <div className="ms-2" style={{ width: 75 }}>
            <img
              src={PlaidLogo}
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: "2.625",
                resizeMode: "contain",
              }}
            />
          </div>
        </div>
      ) : (
        <Spinner color="white" />
      )}
    </Button>
  );
};

export default Checkout;
