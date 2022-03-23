import React, { useEffect, useState } from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import HouseCover from "../Assets/HousesCover.png";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Button, HStack, Text, useTheme } from "native-base";
import { FaAndroid, FaApple, FaChevronRight } from "react-icons/fa";

const Beta = ({ setNavbarTransparent }) => {
  const theme = useTheme();
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  return (
    <div>
      <ParallaxBanner
        style={{
          height: "40vh",
          marginTop: navbarHeight,
        }}
        layers={[
          {
            image: HouseCover,
            speed: -20,
          },
          {
            children: (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#00000080",
                }}
              >
                <Container
                  style={{
                    height: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Row style={{ width: "100%" }}>
                    <Col>
                      <h1
                        style={{
                          color: theme.colors.primary["50"],
                          fontFamily: "Avenir-Black",
                        }}
                      >
                        Get early Access
                      </h1>
                      <h3
                        style={{
                          color: theme.colors.muted["300"],
                          fontFamily: "Avenir-Heavy",
                        }}
                      >
                        Test out Wadzoo before it launches
                      </h3>
                    </Col>
                  </Row>
                </Container>
              </div>
            ),
            speed: 1,
          },
        ]}
      />
      <div style={{ width: "100%" }}>
        <Container className="p-5">
          <Row>
            <Col />
            <Col xs="12" lg="5" className="p-5">
              <div className="py-3">
                <HStack
                  justifyContent="flex-start"
                  alignItems="center"
                  space={4}
                >
                  <FaApple size={40} color={theme.colors.secondary["800"]} />
                  <h1
                    className="mt-auto"
                    style={{
                      margin: 0,
                      fontFamily: "Avenir-Heavy",
                      color: theme.colors.secondary["800"],
                    }}
                  >
                    Apple
                  </h1>
                </HStack>
              </div>
              <div className="py-3">
                <h1
                  style={{
                    fontFamily: "Avenir-Heavy",
                    fontSize: "1.5rem",
                    color: theme.colors.muted["500"],
                  }}
                >
                  Beta testing through Apple requires you to download
                  TestFlight.
                </h1>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  style={{
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    backgroundColor: theme.colors.primary["500"],
                    fontFamily: "Avenir-Heavy",
                  }}
                  onPress={() =>
                    window.open("https://testflight.apple.com/join/fX7GFyPJ")
                  }
                >
                  <HStack alignItems="center" space={2}>
                    <Text fontWeight={300} button>
                      START TESTING
                    </Text>
                    <FaChevronRight size={12} color="white" />
                  </HStack>
                </Button>
              </div>
            </Col>
            <Col xs="12" lg="5" className="p-5">
              <div className="py-3">
                <HStack
                  justifyContent="flex-start"
                  alignItems="center"
                  space={4}
                >
                  <FaAndroid size={40} color={theme.colors.secondary["800"]} />
                  <h1
                    className="mt-auto"
                    style={{
                      margin: 0,
                      fontFamily: "Avenir-Heavy",
                      color: theme.colors.secondary["800"],
                    }}
                  >
                    Android
                  </h1>
                </HStack>
              </div>
              <div className="py-3">
                <h1
                  style={{
                    fontFamily: "Avenir-Heavy",
                    fontSize: "1.5rem",
                    color: theme.colors.muted["500"],
                  }}
                >
                  Beta testing for Android is now live!
                </h1>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  style={{
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    backgroundColor: theme.colors.primary["500"],
                    fontFamily: "Avenir-Heavy",
                  }}
                  onPress={() =>
                    window.open(
                      "https://play.google.com/apps/testing/com.wadzoo"
                    )
                  }
                >
                  <HStack alignItems="center" space={2}>
                    <Text fontWeight={300} button>
                      START TESTING
                    </Text>
                    <FaChevronRight size={12} color="white" />
                  </HStack>
                </Button>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Beta;
