import React from "react";
import { useTheme } from "native-base";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            <div className="d-flex flex-column justify-content-start align-items-start">
              <h1
                style={{
                  color: theme.colors.secondary["800"],
                  fontFamily: "Avenir-Black",
                }}
              >
                This link hasn't been set up yet...
              </h1>
              <h3
                className="py-3"
                style={{
                  color: theme.colors.muted["400"],
                  fontFamily: "Avenir-Heavy",
                }}
              >
                You can contact us{" "}
                <a
                  style={{ color: theme.colors.primary["500"] }}
                  href="mailto:matthew@wadzoo.com?subject=Inquiry About Wadzoo"
                >
                  here.
                </a>
              </h3>
              <h3
                style={{
                  color: theme.colors.muted["400"],
                  fontFamily: "Avenir-Heavy",
                }}
              >
                Download Wadzoo{" "}
                <Link
                  style={{ color: theme.colors.primary["500"] }}
                  to="/download"
                >
                  here.
                </Link>
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccessDenied;
