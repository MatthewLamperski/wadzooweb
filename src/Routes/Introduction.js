import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../node_modules/video-react/dist/video-react.css";
import { Text } from "native-base"; // import css

const Introduction = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingTop: navbarHeight,
      }}
    >
      <Container
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
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
        <Text fontSize={24} fontWeight={300}>
          Welcome to Wadzoo.
        </Text>
        <Text fontSize={18}>Click play to see what we're about.</Text>
      </Container>
    </div>
  );
};

export default Introduction;
