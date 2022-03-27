import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Avatar, Box, Button, Skeleton, Text, useTheme } from "native-base";
import { FaArrowRight, FaCertificate, FaCheck } from "react-icons/all";
import BeginnerAvi from "../Assets/beginner.jpg";
import InterAvi from "../Assets/intermediate.jpg";
import AdvancedAvi from "../Assets/advanced.jpg";
import "./VerifyBadge.css";

const VerifyBadge = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const theme = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: navbarHeight,
      }}
    >
      <Container
        className="py-3"
        style={{
          justifyContent: "start",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="d-flex flex-row align-items-center">
          <FaCertificate color={theme.colors.secondary["800"]} size={20} />
          <Text
            px={2}
            py={0}
            fontSize={18}
            fontWeight={300}
            color="secondary.800"
          >
            Badge Verification
          </Text>
        </div>
      </Container>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Row
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Col xs={12} md={4}>
            <div style={{ position: "relative" }}>
              <div
                style={{ overflow: "hidden" }}
                className="iphone d-flex flex-column align-items-center justify-content-start"
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    backgroundColor: theme.colors.dark["50"],
                    margin: 10,
                    padding: 10,
                    borderRadius: 8,
                    flexDirection: "column",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <div
                    style={{ width: "100%" }}
                    className="d-flex justify-content-start align-items-center"
                  >
                    <Avatar
                      borderWidth={1}
                      borderColor="primary.400"
                      mx={2}
                      mt={2}
                      size="sm"
                      source={InterAvi}
                    />
                    <Skeleton mr="auto" w="50%" h={3} />
                  </div>
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
                    <Text fontWeight={300} fontSize={8}>
                      Intermediate
                    </Text>
                  </div>
                  <Skeleton mb={1} w="90%" h={3} />
                  <Skeleton mb={1} w="90%" h={3} />
                  <div className="mb-2" style={{ width: "90%" }}>
                    <Skeleton w="50%" h={3} />
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    backgroundColor: theme.colors.dark["50"],
                    margin: 10,
                    padding: 10,
                    borderRadius: 8,
                    flexDirection: "column",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <div
                    style={{ width: "100%" }}
                    className="d-flex justify-content-start align-items-center"
                  >
                    <Avatar
                      borderWidth={1}
                      borderColor="primary.400"
                      mx={2}
                      mt={2}
                      size="sm"
                      source={AdvancedAvi}
                    />
                    <Skeleton mr="auto" w="50%" h={3} />
                  </div>
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
                    <Text fontWeight={300} fontSize={8}>
                      Advanced
                    </Text>
                  </div>
                  <Skeleton mb={1} w="90%" h={3} />
                  <Skeleton mb={1} w="90%" h={3} />
                  <div className="mb-2" style={{ width: "90%" }}>
                    <Skeleton w="50%" h={3} />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="px-4 d-flex flex-column py-4">
              <Text fontWeight={300} fontSize={30} color="secondary.800">
                Let other investors know you mean business.
              </Text>
              <Text py={2} fontSize={18} color="muted.400">
                Become a verified seller on Wadzoo and watch your sales
                skyrocket.
              </Text>
            </div>
          </Col>
        </Row>

        <Row
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Col style={styles.badgeContainer} xs={12} sm={8} md={4} lg={3}>
            <a
              href="/beta"
              className="animate-shadow-card"
              style={styles.cardContainer}
            >
              <Avatar
                borderWidth={1}
                borderColor="primary.400"
                source={BeginnerAvi}
                size="xl"
              />
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
              <div
                style={{ width: "100%", position: "absolute", top: 0 }}
                className="d-flex flex-grow-1 flex-column align-items-end p-3"
              >
                <Text color="muted.400">Free</Text>
              </div>
              <div
                className="d-flex flex-grow-1 flex-column align-items-start p-3"
                style={{ width: "100%" }}
              >
                <Text py={2} color="secondary.800" fontWeight={300}>
                  All you have to do is
                </Text>
                <div className="d-flex flex-row align-items-center">
                  <FaCheck
                    className="mx-3"
                    color={theme.colors.primary["500"]}
                  />
                  <Text color="muted.500">Download Wadzoo and sign up</Text>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <FaCheck
                    className="mx-3"
                    color={theme.colors.primary["500"]}
                  />
                  <Text color="muted.500">
                    This badge is given to all of our members
                  </Text>
                </div>
                <Button
                  href="/download"
                  mt={7}
                  mx="auto"
                  borderRadius={50}
                  w="75%"
                >
                  <Text fontWeight={300} my={0} button>
                    Download
                  </Text>
                </Button>
              </div>
            </a>
          </Col>
          <Col style={styles.badgeContainer} xs={12} sm={8} md={4} lg={3}>
            <a
              href="/checkout/verifyIntermediate"
              className="animate-shadow-card"
              style={styles.cardContainer}
            >
              <Avatar
                borderWidth={1}
                borderColor="primary.400"
                source={InterAvi}
                size="xl"
              />
              <div
                className="py-1 px-3 my-2"
                style={{
                  backgroundColor: theme.colors.secondary["400"],
                  borderRadius: 50,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text>Intermediate</Text>
              </div>
              <div
                style={{ width: "100%", position: "absolute", top: 0 }}
                className="d-flex flex-grow-1 flex-column align-items-end p-3"
              >
                <Text color="muted.400">$19.99</Text>
              </div>
              <div
                className="d-flex flex-grow-1 flex-column align-items-start p-3"
                style={{ width: "100%" }}
              >
                <Text py={2} color="secondary.800" fontWeight={300}>
                  We will verify you have
                </Text>
                <div className="d-flex flex-row align-items-center">
                  <FaCheck
                    className="mx-3"
                    color={theme.colors.primary["500"]}
                  />
                  <Text color="muted.500">Done 10 - 15 deals</Text>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <FaCheck
                    className="mx-3"
                    color={theme.colors.primary["500"]}
                  />
                  <Text color="muted.500">At least $300k in funding</Text>
                </div>
                <Button
                  mt={7}
                  mx="auto"
                  borderRadius={50}
                  w="75%"
                  href="/checkout/verifyIntermediate"
                >
                  <Text fontWeight={300} my={0} button>
                    Get verified
                  </Text>
                </Button>
              </div>
            </a>
          </Col>
          <Col style={styles.badgeContainer} xs={12} sm={8} md={4} lg={3}>
            <a
              href="/checkout/verifyAdvanced"
              className="animate-shadow-card"
              style={styles.cardContainer}
            >
              <Avatar
                borderWidth={1}
                borderColor="primary.400"
                source={AdvancedAvi}
                size="xl"
              />
              <div
                className="py-1 px-3 my-2"
                style={{
                  background: `linear-gradient(-45deg, ${theme.colors.primary["400"]}, ${theme.colors.secondary["400"]})`,
                  borderRadius: 50,
                  display: "flex",
                  justifyContent: "center",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                }}
              >
                <Text>Advanced</Text>
              </div>
              <div
                style={{ width: "100%", position: "absolute", top: 0 }}
                className="d-flex flex-grow-1 flex-column align-items-end p-3"
              >
                <Text color="muted.400">$29.99</Text>
              </div>
              <div
                className="d-flex flex-grow-1 flex-column align-items-start p-3"
                style={{ width: "100%" }}
              >
                <Text py={2} color="secondary.800" fontWeight={300}>
                  We will verify you have
                </Text>
                <div className="d-flex flex-row align-items-center">
                  <FaCheck
                    className="mx-3"
                    color={theme.colors.primary["500"]}
                  />
                  <Text color="muted.500">Done 50+ deals</Text>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <FaCheck
                    className="mx-3"
                    color={theme.colors.primary["500"]}
                  />
                  <Text color="muted.500">At least $500k in funding</Text>
                </div>
                <Button
                  mt={7}
                  mx="auto"
                  borderRadius={50}
                  w="75%"
                  href="/checkout/verifyAdvanced"
                >
                  <Text fontWeight={300} my={0} button>
                    Get verified
                  </Text>
                </Button>
              </div>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const styles = {
  badgeContainer: {
    padding: 30,
    flexDirection: "column",
    display: "flex",
  },
  cardContainer: {
    borderRadius: 8,
    padding: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    paddingTop: 30,
    cursor: "pointer",
    textDecoration: "none",
  },
};

export default VerifyBadge;
