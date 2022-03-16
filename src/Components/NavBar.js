import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, Image } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import { useTheme } from "native-base";
import LogoLongWhite from "../Assets/LogoLongWhite.png";
const NavBar = ({ navbarTransparent, setNavbarTransparent }) => {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (expanded) {
      setNavbarTransparent(false);
    } else if (!expanded) {
    }
  }, [expanded]);
  const theme = useTheme();
  return (
    <Navbar
      fixed="top"
      expanded={expanded}
      variant="dark"
      expand="md"
      style={{
        fontFamily: "Avenir-Heavy",
        backgroundColor: navbarTransparent
          ? "transparent"
          : theme.colors.secondary["900"],
      }}
    >
      <Container style={{ alignItems: "baseline" }}>
        <Navbar.Brand style={{ padding: 5 }} href="/">
          <Image src={LogoLongWhite} height="50" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => {
            if (expanded) {
              setExpanded(false);
            } else {
              setExpanded(true);
            }
          }}
          className="ml-auto"
          style={{ border: "none" }}
          aria-controls="basic-navbar-nav"
        >
          <FiMenu color={theme.colors.secondary["50"]} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/beta">Beta Testing</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
