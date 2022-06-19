import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useTheme } from "native-base";
import LogoBlack from "../Assets/LogoLongBlack.png";

const BugReport = ({ setNavbarTransparent }) => {
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
          <Col className="d-flex flex-column align-items-start">
            <div className="my-4">
              <Image src={LogoBlack} style={{ height: 75, width: "auto" }} />
            </div>
            <h1
              style={{
                color: theme.colors.secondary["800"],
                fontFamily: "Avenir-Black",
              }}
            >
              This link is still under construction...
            </h1>
            <h3
              className="py-3"
              style={{
                color: theme.colors.muted["400"],
                fontFamily: "Avenir-Heavy",
              }}
            >
              For now, you can contact us{" "}
              <a
                style={{ color: theme.colors.primary["500"] }}
                href="mailto:matthew@wadzoo.com?subject=Inquiry About Wadzoo"
              >
                here.
              </a>
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BugReport;
