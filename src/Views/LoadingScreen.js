import React, { useEffect, useState } from "react";
import { Spinner, useTheme } from "native-base";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoadingScreen = ({ setNavbarTransparent }) => {
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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: navbarHeight,
      }}
    >
      <Container
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col>
            <Spinner color="primary.500" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoadingScreen;
