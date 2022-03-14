import React from 'react';
import {Nav, Navbar, Container} from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar fixed="top" bg="transparent" variant="dark" expand="md" style={{fontFamily: 'Avenir-Heavy'}}>
      <Container>
        <Navbar.Brand href="/">
          Wadzoo
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/verifybadge">Verify</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
