import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import LogoLongWhite from "../Assets/LogoLongWhite.png";
import { useNavigate } from "react-router-dom";
import { useTheme, VStack } from "native-base";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: theme.colors.secondary["900"], padding: 50 }}
    >
      <Container>
        <Row>
          <Col className="d-flex">
            <VStack
              justifyContent="center"
              alignItems="center"
              flex={1}
              space={2}
            >
              <a
                style={{
                  color: theme.colors.muted["400"],
                  textDecoration: "none",
                  fontFamily: "Avenir-Heavy",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </a>
              <a
                style={{
                  color: theme.colors.muted["400"],
                  textDecoration: "none",
                  fontFamily: "Avenir-Heavy",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/download")}
              >
                Beta Test
              </a>
            </VStack>
          </Col>
          <Col className="d-flex px-auto">
            <Image src={LogoLongWhite} height="60" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
