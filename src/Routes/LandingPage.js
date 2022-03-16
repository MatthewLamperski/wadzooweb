import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { ParallaxBanner } from "react-scroll-parallax";
import "./LandingPage.css";
import {
  PresenceTransition,
  Button,
  useTheme,
  Text,
  HStack,
} from "native-base";
import { Container, Image, Row, Col } from "react-bootstrap";
import HousesVideo from "../Assets/houses.mp4";
import VideoCover from "react-video-cover";
import Investors from "../Assets/Investors.png";
import Map from "../Assets/Map.png";

const LandingPage = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  const theme = useTheme();
  const bodyRef = useRef(null);
  const scrollToBody = () =>
    window.scrollTo({
      top: bodyRef.current.offsetTop - 100,
      behavior: "auto",
    });
  useEffect(() => {
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  useEffect(() => {
    let bannerHeight = document
      .getElementsByClassName("banner")
      .item(0).clientHeight;
    let navbarHeight = document
      .getElementsByClassName("navbar")
      .item(0).clientHeight;
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled < bannerHeight - navbarHeight) {
        setNavbarTransparent(true);
      } else if (scrolled >= bannerHeight - navbarHeight) {
        setNavbarTransparent(false);
      }
    });
  }, []);
  return (
    <div>
      <ParallaxBanner
        className="banner"
        style={{
          height: "91vh",
        }}
        layers={[
          {
            children: (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  overflow: "hidden",
                  backgroundColor: theme.colors.primary["800"],
                }}
              >
                <VideoCover
                  videoOptions={{
                    src: HousesVideo,
                    muted: true,
                    loop: true,
                    autoPlay: true,
                    playsInline: true,
                  }}
                />
              </div>
            ),
            amount: 0.4,
          },
        ]}
      >
        <div
          style={{
            ...styles.titleContainer,
            paddingTop: navbarHeight,
            backgroundColor: "#00000060",
          }}
        >
          <PresenceTransition
            visible={true}
            initial={{ opacity: 0, translateY: 50 }}
            animate={{
              opacity: 1,
              transition: { duration: 500 },
            }}
            style={{ flex: 1, paddingHorizontal: "15px" }}
          >
            <Container className="my-auto">
              <h1
                style={{
                  fontSize: "3.5rem",
                  color: theme.colors.primary["400"],
                  fontFamily: "Avenir-Black",
                }}
              >
                Connecting Investors Better.
              </h1>
              <div style={{ padding: 2 }}>
                <h4
                  style={{
                    color: theme.colors.secondary["50"],
                    fontFamily: "Avenir-Heavy",
                  }}
                >
                  Expand your network. Find exclusive off-market listings.
                </h4>
              </div>
              <div style={{ display: "flex", px: "auto" }}>
                <Button
                  size="sm"
                  style={{
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    backgroundColor: theme.colors.primary["500"],
                    fontFamily: "Avenir-Heavy",
                  }}
                  onPress={() => scrollToBody()}
                >
                  <HStack alignItems="center" space={2}>
                    <Text fontWeight={300} button>
                      SEE MORE
                    </Text>
                    <FaChevronDown size={12} color="white" />
                  </HStack>
                </Button>
              </div>
            </Container>
          </PresenceTransition>
        </div>
        <div
          style={{ ...styles.triangleContainer, backgroundColor: "#00000060" }}
        >
          <div style={{ ...styles.triangle }} />
        </div>
      </ParallaxBanner>
      <div ref={bodyRef}>
        <Row
          style={{
            width: "100%",
            margin: 0,
            backgroundColor: theme.colors.light["50"],
          }}
        >
          <Col />
          <Col
            xs="12"
            lg="5"
            className="my-auto py-5"
            style={{ textAlign: "center" }}
          >
            <Image
              fluid
              src={Map}
              className="moveScreenshot"
              style={{ width: "40%", height: "auto" }}
            />
            <Image
              fluid
              src={Investors}
              className="moveScreenshot"
              style={{ width: "40%", height: "auto" }}
            />
          </Col>
          <Col
            xs="12"
            lg="5"
            className="my-auto py-5"
            style={{ color: theme.colors.secondary["800"] }}
          >
            <div className="p-4">
              <h1
                style={{
                  fontFamily: "Avenir-Black",
                }}
              >
                Connect
              </h1>
              <h1
                style={{
                  fontFamily: "Avenir-Heavy",
                  fontSize: "1.5rem",
                  color: theme.colors.muted["500"],
                }}
              >
                See what local investors are saying about properties in your
                area.
              </h1>
            </div>
            <div className="p-4">
              <h1
                style={{
                  fontFamily: "Avenir-Black",
                }}
              >
                Explore
              </h1>
              <h1
                style={{
                  fontFamily: "Avenir-Heavy",
                  fontSize: "1.5rem",
                  color: theme.colors.muted["500"],
                }}
              >
                Get access to off-market properties found nowhere else
              </h1>
            </div>
          </Col>
          <Col />
        </Row>
      </div>
    </div>
  );
};

const styles = {
  titleContainer: {
    position: "absolute",
    top: 0,
    bottom: "20vh",
    left: 0,
    right: 0,
    display: "flex",
  },
  triangleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20vh",
    width: "100vw",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "100vw solid transparent",
    borderBottom: "20vh solid #f2f2f2",
  },
  nameStyles: {
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "3vh",
    marginLeft: "3vh",
    color: "white",
  },
};

export default LandingPage;
