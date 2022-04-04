import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Box, Image, PresenceTransition, Text, useTheme } from "native-base";
import { AppContext } from "../AppContext";
import PortalAuth from "../Routes/PortalAuth";
import LoadingScreen from "./LoadingScreen";
import "./BadgeStatus.css";
import { FaUser } from "react-icons/fa";
import { getProfilePicURL } from "../FirebaseInterface";
import LogoLongWhite from "../Assets/LogoLongWhite.png";
import { useNavigate } from "react-router-dom";

export const AdvancedBadge = () => {
  const theme = useTheme();
  return (
    <div
      className="py-1 px-3 my-2 me-auto"
      style={{
        background: `linear-gradient(-45deg, ${theme.colors.primary["400"]}, ${theme.colors.secondary["400"]})`,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        marginLeft: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
      }}
    >
      <Text fontWeight={300}>Advanced</Text>
    </div>
  );
};

export const IntermediateBadge = () => {
  const theme = useTheme();
  return (
    <div
      className="py-1 px-3 my-2 me-auto"
      style={{
        marginLeft: 10,
        backgroundColor: theme.colors.secondary["400"],
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text fontWeight={300}>Intermediate</Text>
    </div>
  );
};

export const BeginnerBadge = () => {
  const theme = useTheme();
  return (
    <div
      className="py-1 px-3 my-2"
      style={{
        backgroundColor: theme.colors.primary["400"],
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text>Beginner</Text>
    </div>
  );
};

const BadgeStatus = ({ setNavbarTransparent }) => {
  const { user } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const theme = useTheme();
  const [profilePic, setProfilePic] = useState();
  useEffect(() => {
    if (user && !profilePic) {
      getProfilePicURL(user.uid)
        .then((url) => setProfilePic(url))
        .catch((err) => console.log(err));
    }
  }, [user]);
  const renderBadge = () => {
    if (user) {
      if (user.badge) {
        if (user.badge === "pending") {
          return (
            <div
              className="py-1 px-3 my-2"
              style={{
                backgroundColor: theme.colors.yellow["400"],
                borderRadius: 50,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text>Pending...</Text>
            </div>
          );
        } else if (user.badge === "advanced") {
          return <AdvancedBadge />;
        } else if (user.badge === "intermediate") {
          return <IntermediateBadge />;
        } else {
          return <BeginnerBadge />;
        }
      } else {
        return <BeginnerBadge />;
      }
    } else {
      return null;
    }
  };
  if (user) {
    return (
      <PresenceTransition
        visible
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 500 } }}
        exit={{ opacity: 0, transition: { duration: 500 } }}
      >
        <div
          style={{
            paddingTop: navbarHeight,
            paddingBottom: navbarHeight,
            minHeight: "100vh",
          }}
          className="animated-gradient d-flex flex-column justify-content-center align-content-center"
        >
          <div className="py-3 d-flex justify-content-center align-content-center">
            <img
              style={{
                height: 100,
                width: "auto",
              }}
              src={LogoLongWhite}
            />
          </div>
          <Row className="d-flex justify-content-center align-content-center">
            <Col
              xs={10}
              md={8}
              lg={6}
              xl={4}
              className="py-4"
              style={{
                backgroundColor: "white",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.09), 0 6px 20px 0 rgba(0, 0, 0, 0.01)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  borderRadius: 8,
                }}
                className="d-flex flex-grow-1 flex-column justify-content-center align-items-center pt-4 p-2"
              >
                <div style={{ position: "relative" }}>
                  <Image
                    key={profilePic ? profilePic : "wadzoo.com"}
                    height={125}
                    width={125}
                    borderRadius={100}
                    borderWidth={1}
                    borderColor="primary.500"
                    source={{
                      uri: profilePic ? profilePic : "wadzoo.com",
                    }}
                    fallbackElement={
                      <Box
                        style={{
                          width: 125,
                          height: 125,
                          borderRadius: 100,
                          backgroundColor: theme.colors.muted["500"],
                          borderWidth: 1,
                          borderColor: theme.colors.primary["500"],
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaUser color={theme.colors.lightText} size={10} />
                      </Box>
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -25,
                      width: "100%",
                    }}
                    className="p-0"
                  >
                    {renderBadge()}
                  </div>
                </div>
                {user.badge === "pending" ? (
                  <div className="d-flex flex-column justify-content-center align-items-start py-4">
                    <Text color="secondary.800" fontWeight={300} fontSize={20}>
                      Under Review
                    </Text>
                    <Text color="muted.400" fontSize={16}>
                      Your request has been successfully submitted!
                    </Text>
                    <Text pt={5} color="muted.400" fontSize={16}>
                      You will be notified when there is action taken on your
                      request, and you can return to this page to check your
                      status.
                    </Text>
                  </div>
                ) : (
                  <div
                    style={{ width: "100%" }}
                    className="d-flex flex-column justify-content-center align-items-start py-4"
                  >
                    <Text color="secondary.800" fontWeight={300} fontSize={20}>
                      {user.badge
                        ? user.badge.charAt(0).toUpperCase() +
                          user.badge.slice(1)
                        : "Beginner"}{" "}
                      Badge
                    </Text>
                    <Text color="muted.400" fontSize={16}>
                      You now have the{" "}
                      {user.badge
                        ? user.badge.charAt(0).toUpperCase() +
                          user.badge.slice(1)
                        : "Beginner"}{" "}
                      Badge! If you would like to upgrade your badge to reflect
                      your experience level, you can go{" "}
                      <a
                        style={{
                          color: theme.colors.muted["600"],
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/verifybadge")}
                      >
                        here
                      </a>
                      .
                    </Text>
                  </div>
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
            </Col>
          </Row>
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

export default BadgeStatus;
