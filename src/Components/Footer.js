import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import LogoLongWhite from "../Assets/LogoLongWhite.png";
import { Link } from "react-router-dom";
import { useTheme, VStack } from "native-base";

const Footer = () => {
  const theme = useTheme();
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
              <Link
                style={{
                  color: theme.colors.muted["400"],
                  textDecoration: "none",
                  fontFamily: "Avenir-Heavy",
                }}
                to="/contact"
              >
                Contact Us
              </Link>
              <Link
                style={{
                  color: theme.colors.muted["400"],
                  textDecoration: "none",
                  fontFamily: "Avenir-Heavy",
                }}
                to="/contact"
              >
                Beta Test
              </Link>
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
