import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native-web";
import HouseCover from "../Assets/HouseCover.jpg";
import { ParallaxBanner } from "react-scroll-parallax";
import { PresenceTransition, Button, useTheme, Text } from "native-base";
import { Container } from "react-bootstrap";

const LandingPage = () => {
  const [navbarHeight, setnavbarHeight] = useState();
  const theme = useTheme();
  const bodyRef = useRef(null);
  const scrollToBody = () =>
    window.scrollTo(0, bodyRef.current.offsetTop - 100);
  useEffect(() => {
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  return (
    <div>
      <ParallaxBanner
        layers={[
          {
            image: HouseCover,
            amount: 0.3,
          },
        ]}
        style={{
          height: "90vh",
        }}
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
            initial={{ opacity: 0, translateX: 50 }}
            animate={{
              opacity: 1,
              transition: { duration: 750 },
            }}
          >
            <Container>
              <h1
                style={{
                  color: "white",
                  fontSize: "8vmax",
                  fontFamily: "Avenir-Black",
                }}
              >
                Wadzoo
              </h1>
              <div style={{ padding: 2 }}>
                <h4 style={{ color: "white", fontFamily: "Avenir-Heavy" }}>
                  Connecting investors better
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
                  <Text button>See More</Text>
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
      <div
        ref={bodyRef}
        style={{
          height: "60vh",
          width: "100vw",
          backgroundColor: theme.colors.light["50"],
        }}
      />
    </div>
  );
};

const styles = {
  titleContainer: {
    position: "absolute",
    top: 0,
    bottom: "35vh",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  triangleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35vh",
    width: "100vw",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "100vw solid transparent",
    borderBottom: "35vh solid #f2f2f2",
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
