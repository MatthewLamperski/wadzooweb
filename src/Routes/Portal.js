import React, { useContext, useEffect, useState } from "react";
import { PresenceTransition, Pressable, Text, useTheme } from "native-base";
import { AppContext } from "../AppContext";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaPlusCircle,
  FaTasks,
  FaUserShield,
  IoGitNetwork,
} from "react-icons/all";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AppIcon from "../Assets/AppIcon.png";
import "./Portal.css";
import { getAppInfo } from "../FirebaseInterface";

export const camelToWords = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
const Portal = ({ setNavbarTransparent }) => {
  const { user } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const [numUsers, setNumUsers] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);

  useEffect(() => {
    getAppInfo().then((appInfo) => setNumUsers(appInfo.usersCount));
  }, []);

  const theme = useTheme();
  const renderDashboard = () => {
    if (user && user.role) {
      return (
        <div
          className="d-flex"
          style={{
            flex: 1,
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Container
            className="pt-5"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              overflowWrap: "break-word",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                color: theme.colors.secondary["800"],
                fontFamily: "Avenir-Black",
              }}
            >
              Welcome back, {user && `${user.firstName}.`}
            </h1>
            <h3
              style={{
                color: theme.colors.muted["500"],
                fontFamily: "Avenir-Black",
                textAlign: "left",
              }}
            >
              Your role is {user && camelToWords(user.role)}.
            </h3>
            {user && user.role && numUsers && user.role.includes("admin") && (
              <h6
                style={{
                  color: theme.colors.muted["500"],
                  fontFamily: "Avenir-Black",
                }}
              >
                Total number of users: {numUsers}
              </h6>
            )}
          </Container>
          <Container className="d-flex py-5 my-auto">
            <Row
              className="justify-content-center justify-content-md-start mx-auto"
              style={styles.rowStyle}
            >
              {user.role.includes("admin") && (
                <Col xs={10} md={6}>
                  <div
                    style={{ borderRadius: 8 }}
                    className="animate-link-shadow"
                  >
                    <Pressable
                      style={styles.actionContainer}
                      onPress={() => navigate("/admin")}
                    >
                      <div style={styles.titleContainer}>
                        <FaUserShield
                          style={styles.iconStyle}
                          color={theme.colors.secondary["800"]}
                        />
                        <Text
                          fontSize={18}
                          fontWeight={300}
                          color="secondary.800"
                        >
                          Admin Dashboard
                        </Text>
                      </div>
                      <div style={styles.contentContainer}>
                        <Text color="muted.400">
                          Here you can view verification requests, pay
                          affiliates, and view Wadzoo analytics.
                        </Text>
                      </div>
                      <Pressable
                        style={styles.buttonContainer}
                        onPress={() => navigate("/admin")}
                      >
                        <Text fontSize={18}>Go</Text>
                        <FaChevronRight color={theme.colors.secondary["800"]} />
                      </Pressable>
                    </Pressable>
                  </div>
                </Col>
              )}
              {(user.role.includes("affiliate") ||
                user.role.includes("admin")) && (
                <Col className="my-3" xs={10} md={6}>
                  <div
                    style={{ borderRadius: 8 }}
                    className="animate-link-shadow"
                  >
                    <Pressable
                      style={styles.actionContainer}
                      onPress={() => navigate("/affiliate")}
                    >
                      <div style={styles.titleContainer}>
                        <IoGitNetwork
                          style={styles.iconStyle}
                          color={theme.colors.secondary["800"]}
                        />
                        <Text
                          fontSize={18}
                          fontWeight={300}
                          color="secondary.800"
                        >
                          Affiliate Dashboard
                        </Text>
                      </div>
                      <div style={styles.contentContainer}>
                        <Text color="muted.400">
                          Here you can view your affiliate analytics, and
                          request payment.
                        </Text>
                      </div>
                      <Pressable
                        style={styles.buttonContainer}
                        onPress={() => navigate("/affiliate")}
                      >
                        <Text fontSize={18}>Go</Text>
                        <FaChevronRight color={theme.colors.secondary["800"]} />
                      </Pressable>
                    </Pressable>
                  </div>
                </Col>
              )}
              {(user.role.includes("dataEntry") ||
                user.role.includes("admin")) && (
                <>
                  <Col xs={10} md={6}>
                    <div
                      style={{ borderRadius: 8 }}
                      className="animate-link-shadow"
                    >
                      <Pressable
                        style={styles.actionContainer}
                        onPress={() => navigate("/createListing")}
                      >
                        <div style={styles.titleContainer}>
                          <FaPlusCircle
                            style={styles.iconStyle}
                            color={theme.colors.secondary["800"]}
                          />
                          <Text
                            fontSize={18}
                            fontWeight={300}
                            color="secondary.800"
                          >
                            Create Listings
                          </Text>
                        </div>
                        <div style={styles.contentContainer}>
                          <Text color="muted.400">
                            Here you can add new listings and create new
                            associated user accounts.
                          </Text>
                        </div>
                        <Pressable
                          style={styles.buttonContainer}
                          onPress={() => navigate("/createListing")}
                        >
                          <Text fontSize={18}>Go</Text>
                          <FaChevronRight
                            color={theme.colors.secondary["800"]}
                          />
                        </Pressable>
                      </Pressable>
                    </div>
                  </Col>
                  <Col className="my-3" xs={10} md={6}>
                    <div
                      style={{ borderRadius: 8 }}
                      className="animate-link-shadow"
                    >
                      <Pressable
                        style={styles.actionContainer}
                        onPress={() => navigate("/manageListings")}
                      >
                        <div style={styles.titleContainer}>
                          <FaTasks
                            style={styles.iconStyle}
                            color={theme.colors.secondary["800"]}
                          />
                          <Text
                            fontSize={18}
                            fontWeight={300}
                            color="secondary.800"
                          >
                            Manage Listings
                          </Text>
                        </div>
                        <div style={styles.contentContainer}>
                          <Text color="muted.400">
                            Here you can delete old listings, edit and change
                            listing information.
                          </Text>
                        </div>
                        <Pressable style={styles.buttonContainer}>
                          <Text fontSize={18}>Go</Text>
                          <FaChevronRight
                            color={theme.colors.secondary["800"]}
                          />
                        </Pressable>
                      </Pressable>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-column justify-content-center align-items-start p-5">
          <img
            src={AppIcon}
            height={75}
            style={{ marginBottom: 20 }}
            alt="App Icon"
          />
          <Text fontWeight={300} color="secondary.800" fontSize={30}>
            Coming soon...
          </Text>
          <Text py={1} color="muted.500">
            Wadzoo Portal has not been set up for users yet. Check back soon!
          </Text>
          <Link style={{ textDecoration: "none" }} to="/download">
            <Text fontSize={18} underline color="primary.600">
              Download Wadzoo here!
            </Text>
          </Link>
        </div>
      );
    }
  };
  return (
    <PresenceTransition
      visible={true}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 500 } }}
      style={{ height: "100%" }}
    >
      <div
        style={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "start",
          paddingTop: navbarHeight,
          display: "flex",
          backgroundColor: "#EDf0F3",
        }}
      >
        {renderDashboard()}
      </div>
    </PresenceTransition>
  );
};

const styles = {
  rowStyle: {
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  iconStyle: {
    margin: 10,
  },
  actionContainer: {
    padding: 10,
    flexDirection: "column",
    display: "flex",
    borderRadius: 8,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
};

export default Portal;
