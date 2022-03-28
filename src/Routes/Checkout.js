import React, { useContext, useEffect, useState } from "react";
import { Button, PresenceTransition, Text, useTheme } from "native-base";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import LoadingScreen from "../Views/LoadingScreen";
import PortalAuth from "./PortalAuth";
import { deviceType } from "./LandingPage";
import "./Checkout.css";
import { FaCheck } from "react-icons/all";
import { usePlaidLink } from "react-plaid-link";

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
  const { user } = useContext(AppContext);
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    console.log(user.uid);
    const response = await fetch("https://wadzoo.com/api/create_link_token", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        uid: user.uid,
      }),
    });
    const data = await response.json();
    setLinkToken(data.link_token);
    console.log("PLAID DATA", data);
  };
  useEffect(() => {
    if (user) {
      generateToken();
    }
  }, [user]);
  const hideOnMobile = () => {
    return deviceType() === "iOS" || deviceType() === "android";
  };
  const StepOne = () => {
    return (
      <PresenceTransition
        visible={step === 1}
        initial={{ opacity: 0, translateX: 30 }}
        animate={{ opacity: 1, translateX: 0, transition: { duration: 300 } }}
      >
        <div className="d-flex flex-column justify-content-start align-items-start py-4">
          <Text fontWeight={300} fontSize={22} color="secondary.800">
            Step 1
          </Text>
          <Text fontSize={18} color="muted.400">
            Verify funding of at least $
            {service === "verifyAdvanced" ? "500" : "300"}k with Plaid
          </Text>
          <PlaidLink linkToken={linkToken} />
        </div>
      </PresenceTransition>
    );
  };
  const StepTwo = () => {
    return (
      <PresenceTransition
        visible={step === 2}
        initial={{ opacity: 0, translateX: 30 }}
        animate={{ opacity: 1, translateX: 0, transition: { duration: 300 } }}
      >
        <div className="d-flex flex-column justify-content-start align-items-start py-4">
          <Text fontWeight={300} fontSize={22} color="secondary.800">
            Step 2
          </Text>
          <Text fontSize={18} color="muted.400">
            Verify you have completed{" "}
            {service === "verifyAdvanced" ? "50+" : "10 - 15"} deals
          </Text>
        </div>
      </PresenceTransition>
    );
  };

  const StepThree = () => {
    return (
      <PresenceTransition
        visible={step === 3}
        initial={{ opacity: 0, translateX: 30 }}
        animate={{ opacity: 1, translateX: 0, transition: { duration: 300 } }}
      >
        <div className="d-flex flex-column justify-content-start align-items-start py-4">
          <Text fontWeight={300} fontSize={22} color="secondary.800">
            Step 3
          </Text>
          <Text fontSize={18} color="muted.400">
            Sumbit your information for verification.
          </Text>
        </div>
      </PresenceTransition>
    );
  };
  if (user) {
    return (
      <PresenceTransition
        visible
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 500 } }}
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
            className="mt-5 mb-3 p-4"
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              display: "flex",
              borderRadius: 8,
            }}
          >
            <Text fontWeight={300} color="secondary.800" fontSize={22}>
              Welcome, {user.firstName}
            </Text>
            <Text fontSize={18} color="muted.400">
              Let's get your account verified for the{" "}
              {service === "verifyAdvanced" ? "Advanced" : "Intermediate"}{" "}
              Badge.
            </Text>
          </Container>
          <Container className="d-flex flex-column justify-content-center align-items-start flex-row px-4">
            <div
              className="d-flex flex-row align-items-center justify-content-between p-3"
              style={{
                width: "100%",
                borderRadius: 8,
                backgroundColor: theme.colors.primary["50"] + "70",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setStep(1)}
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
                style={{ cursor: "pointer" }}
                onClick={() => setStep(2)}
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
                style={{ cursor: "pointer" }}
                onClick={() => setStep(3)}
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
            <StepOne />
            <StepTwo />
            <StepThree />
          </Container>
        </div>
      </PresenceTransition>
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

const PlaidLink = ({ linkToken }) => {
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log("PT", public_token);
      console.log(metadata);
    },
  });
  return (
    <Button onPress={() => open()} isDisabled={!ready}>
      <Text button>Connect a bank account</Text>
    </Button>
  );
};

export default Checkout;
