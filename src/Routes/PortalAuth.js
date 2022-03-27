import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Spinner, Text, useTheme } from "native-base";
import { Col, Container, Image } from "react-bootstrap";
import LogoBlack from "../Assets/LogoBlack.png";
import GoogleLogo from "../Assets/svgs/GoogleLogo";
import {
  continueWithGoogleRedirect,
  continueWithGooglePopup,
  getRedirect,
  signInWithEmail,
} from "../FirebaseInterface";
import { AppContext } from "../AppContext";
import { deviceType } from "./LandingPage";

const PortalAuth = ({ setNavbarTransparent, text }) => {
  const { setError } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  useEffect(() => {
    getRedirect().catch((err) => {
      if (err.code) {
        setError({
          title: "Error, contact development.",
          message: JSON.stringify(err),
        });
      }
    });
  }, []);
  const theme = useTheme();
  const validated = () => {
    if (email && password) {
      if (email.length === 0 || password.length === 0) {
        setError({
          title: "Forms not complete",
          message: "Please ensure all fields are filled.",
        });
        return false;
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setError({
          title: "Bad format",
          message: "Please ensure your email is formatted correctly.",
        });
        return false;
      } else {
        return true;
      }
    } else {
      setError({
        title: "Forms not complete",
        message: "Please ensure all fields are filled.",
      });
      return false;
    }
  };
  const handleContinueWithGoogle = () => {
    if (!googleLoading) {
      setGoogleLoading(true);
      if (deviceType() === "iOS" || deviceType() === "android") {
        continueWithGoogleRedirect().catch((err) => {
          setGoogleLoading(false);
          console.log(err);
          setError({
            title: err.code,
            message: `${JSON.stringify(err)}`,
          });
        });
      } else {
        continueWithGooglePopup().catch((err) => {
          setGoogleLoading(false);
          console.log(err);
          if (err.code !== "auth/popup-closed-by-user") {
            setError({
              title: "Something went wrong.",
              message: `Contact Development: ${JSON.stringify(err)}`,
            });
          }
        });
      }
    } else {
      setGoogleLoading(false);
    }
  };
  const handleLogIn = () => {
    if (!loading) {
      setLoading(true);
      if (validated()) {
        signInWithEmail(email, password).catch((err) => {
          setLoading(false);
          let notification = {
            title: "Invalid login attempt!",
          };
          if (err.code === "auth/invalid-email") {
            notification.message = "That email address is not valid.";
          } else if (err.code === "auth/user-disabled") {
            notification.message =
              "You have been disabled, contact support for more information.";
          } else if (err.code === "auth/user-not-found") {
            notification.message = "There is no user with that email.";
          } else if (err.code === "auth/wrong-password") {
            notification.message =
              "Those credentials don't match with our system. (You may have signed up with Google)";
          }
          setError(notification);
        });
      } else {
        setLoading(false);
      }
    }
  };
  const handleKeypress = ({ keyCode }) => {
    if (keyCode === 13) {
      handleLogIn();
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: navbarHeight,
        display: "flex",
      }}
    >
      <Container
        className="p-4"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          style={{
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div>
            <Image src={LogoBlack} style={{ height: 50, width: "auto" }} />
          </div>
          <Text px={3} fontSize={30} fontWeight={300}>
            Log In
          </Text>
          <Text px={3} fontSize={18} color="muted.500">
            {text ? text : "Access your Wadzoo portal here."}
          </Text>
          <div className="py-5">
            <Button
              _pressed={{ opacity: 0.4 }}
              borderRadius={50}
              borderWidth={1}
              borderColor="muted.300"
              variant="unstyled"
              onPress={handleContinueWithGoogle}
              type="submit"
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                {googleLoading ? (
                  <Spinner color="primary.500" />
                ) : (
                  <>
                    <GoogleLogo height="18" width="18" />
                    <Text px={2} fontSize={14} fontWeight={300} color="black">
                      Continue with Google
                    </Text>{" "}
                  </>
                )}
              </div>
            </Button>
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
            className="py-3"
          >
            <div
              style={{
                height: 1,
                flex: 1,
                backgroundColor: theme.colors.muted["400"],
              }}
            />
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
              className="px-2"
            >
              <Text fontSize={12} color="muted.400">
                or log in with email
              </Text>
            </div>
            <div
              style={{
                height: 1,
                flex: 1,
                backgroundColor: theme.colors.muted["400"],
              }}
            />
          </div>
          <div>
            <div
              className="py-3"
              style={{
                borderRadius: 8,
                flexDirection: "column",
                display: "flex",
              }}
            >
              <Text fontWeight={300} fontSize={16}>
                Email
              </Text>
              <Input
                value={email ? email : ""}
                onChangeText={(text) => setEmail(text)}
                py={4}
                variant="underlined"
                placeholder="example@gmail.com"
              />
            </div>

            <div
              className="py-3"
              style={{
                borderRadius: 8,
                flexDirection: "column",
                display: "flex",
              }}
            >
              <Text fontWeight={300} fontSize={16}>
                Password
              </Text>
              <Input
                onKeyPress={handleKeypress}
                value={password ? password : ""}
                onChangeText={(text) => setPassword(text)}
                py={4}
                variant="underlined"
                type="password"
                placeholder="Password"
              />
            </div>

            <Button
              borderRadius={50}
              onPress={() => handleLogIn()}
              type="submit"
            >
              {loading ? (
                <Spinner button />
              ) : (
                <Text fontWeight={300} button>
                  Log In
                </Text>
              )}
            </Button>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default PortalAuth;
