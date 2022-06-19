import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { ParallaxBanner } from "react-scroll-parallax";
import "./LandingPage.css";
import {
  Button,
  HStack,
  PresenceTransition,
  Text,
  useTheme,
} from "native-base";
import { Col, Container, Image, Row } from "react-bootstrap";
import HousesVideo from "../Assets/houses.mp4";
import HousesCover from "../Assets/HousesCover.png";
import Investors from "../Assets/Investors.png";
import Map from "../Assets/Map.png";
import VideoCover from "react-video-cover";
import { useNavigate } from "react-router-dom";

export const deviceType = () => {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
};

const LandingPage = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  const navigate = useNavigate();
  const theme = useTheme();
  const bodyRef = useRef(null);
  const scrollToBody = () =>
    window.scrollTo({
      top: bodyRef.current.offsetTop - 100,
      behavior: "auto",
    });
  const changeTransparentNavbar = () => {
    let bannerHeight = document
      .getElementsByClassName("banner")
      .item(0).clientHeight;
    let scrolled = document.scrollingElement.scrollTop;
    if (scrolled < bannerHeight) {
      setNavbarTransparent(true);
    } else if (scrolled >= bannerHeight) {
      setNavbarTransparent(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeTransparentNavbar);
    return () => {
      console.log("returned");
      window.removeEventListener("scroll", changeTransparentNavbar);
    };
  }, []);
  return (
    <div>
      <ParallaxBanner
        className="banner"
        style={{
          height: "110vh",
        }}
        layers={[
          {
            children: (
              <div
                style={{
                  backgroundColor: theme.colors.primary["700"],
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <VideoCover
                  videoOptions={{
                    src: HousesVideo,
                    muted: true,
                    autoPlay: true,
                    loop: true,
                    playsInline: true,
                    poster: deviceType() === "android" ? HousesCover : null,
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                />
              </div>
            ),
            speed: 0,
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
                  endIcon={<FaChevronDown size={12} color="white" />}
                  _text={{ color: "white", fontSize: 14, fontWeight: 300 }}
                  style={{
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    backgroundColor: theme.colors.primary["500"],
                    fontFamily: "Avenir-Heavy",
                  }}
                  onPress={() => scrollToBody()}
                >
                  SEE MORE
                </Button>
                <Button
                  ml={2}
                  my={3}
                  variant="outline"
                  _text={{ fontSize: 14, fontWeight: 300 }}
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 20,
                  }}
                  size="sm"
                  rounded="3xl"
                  endIcon={
                    <FaChevronRight
                      size={12}
                      color={theme.colors.primary["500"]}
                    />
                  }
                  onPress={() => {
                    if (deviceType() === "iOS") {
                      window.open(
                        "https://apps.apple.com/us/app/wadzoo/id1605839076?itsct=apps_box_link&itscg=30200"
                      );
                    } else if (deviceType() === "android") {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.wadzoo"
                      );
                    } else {
                      scrollToBody();
                    }
                  }}
                >
                  DOWNLOAD NOW
                </Button>
              </div>
              <HStack alignItems="center" justifyContent="flex-start">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<a href="https://apps.apple.com/us/app/wadzoo/id1605839076?itsct=apps_box_badge&amp;itscg=30200" style="display: flex; overflow: hidden; width: 145px; justify-content: flex-start; align-items: center;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1653782400&h=bc3a755c4b724cbe09e03fdb58d7a072" alt="Download on the App Store" style="width: 145px;"></a>',
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<a href='https://play.google.com/store/apps/details?id=com.wadzoo&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' style=\"display: flex; justify-content: flex-start; align-items: center; overflow: hidden; border-radius: 13px; width: 170px; height: 100px;\"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' style=\"border-radius: 13px; width: 170px;\"/></a>",
                  }}
                />
              </HStack>
            </Container>
          </PresenceTransition>
        </div>
        <div
          style={{ ...styles.triangleContainer, backgroundColor: "#00000060" }}
        >
          <div style={{ ...styles.triangle }} />
        </div>
      </ParallaxBanner>
      <div
        style={{
          backgroundColor: theme.colors.light["50"],
        }}
        ref={bodyRef}
      >
        <Container>
          <div
            style={{
              padding: 20,
              backgroundColor: theme.colors.light["50"],
            }}
          >
            <Text fontSize={25} fontWeight={300}>
              Now Introducing: Wadzoo
            </Text>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                overflow: "hidden",
              }}
            >
              <iframe
                style={{
                  overflow: "hidden",
                  border: 0,
                  alignSelf: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                src="https://www.youtube.com/embed/1eDOkd6IPKY"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
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
                Get access to off-market properties found nowhere else.
              </h1>
            </div>
            <div className="p-4">
              <h1
                style={{
                  fontFamily: "Avenir-Black",
                }}
              >
                Download Now!
              </h1>
              <h1
                style={{
                  fontFamily: "Avenir-Heavy",
                  fontSize: "1.5rem",
                  color: theme.colors.muted["500"],
                }}
              >
                Wadzoo is officially available for download on iOS and Android
                devices!
              </h1>
              <div style={{ display: "flex" }}>
                <Button
                  size="sm"
                  style={{
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    backgroundColor: theme.colors.primary["500"],
                    fontFamily: "Avenir-Heavy",
                  }}
                  onPress={() => navigate("/download")}
                >
                  <HStack alignItems="center" space={2}>
                    <Text fontWeight={300} button>
                      Download
                    </Text>
                    <FaChevronRight size={12} color="white" />
                  </HStack>
                </Button>
              </div>
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
