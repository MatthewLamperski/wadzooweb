import React, { useContext, useState } from "react";
import { Container, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import { Pressable, Text, useTheme } from "native-base";
import LogoLongWhite from "../Assets/LogoLongWhite.png";
import LogoLongBlack from "../Assets/LogoLongBlack.png";
import { signMeOut } from "../FirebaseInterface";
import {
  FaAppStore,
  FaChevronRight,
  FaEnvelope,
  FaGooglePlay,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/all";
import { deviceType } from "../Routes/LandingPage";

const NavBar = ({ navbarTransparent, setNavbarTransparent, navbarHidden }) => {
  const { FIRUser, user } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Navbar
      fixed="top"
      variant="dark"
      expand={false}
      style={{
        fontFamily: "Avenir-Heavy",
        backgroundColor: navbarTransparent
          ? "transparent"
          : theme.colors.secondary["900"],
        boxShadow: navbarTransparent
          ? null
          : "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: navbarHidden ? "none" : null,
      }}
    >
      <Container fluid>
        <Navbar.Brand
          style={{ padding: 5 }}
          onClick={() => {
            setShow(false);
            navigate("/");
          }}
        >
          <Image src={LogoLongWhite} height="35" />{" "}
        </Navbar.Brand>

        <Navbar.Toggle
          onClick={() => setShow(true)}
          className="ml-auto"
          style={{ border: "none" }}
          aria-controls="basic-navbar-nav"
        >
          <FiMenu color={theme.colors.secondary["50"]} />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          show={show}
          onHide={() => setShow(false)}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Image
                onClick={() => {
                  setShow(false);
                  navigate("/");
                }}
                src={LogoLongBlack}
                height="40"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Nav.Link
                onClick={() => {
                  setShow(false);
                  navigate("/download");
                }}
              >
                <div
                  className="p-3"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 8,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {deviceType() === "android" ? (
                      <FaGooglePlay
                        size={22}
                        color={theme.colors.secondary["800"]}
                        className="mx-2"
                      />
                    ) : (
                      <FaAppStore
                        solid
                        size={22}
                        color={theme.colors.secondary["800"]}
                        className="mx-2"
                      />
                    )}
                    <Text color="secondary.800" fontWeight={300} fontSize={20}>
                      Download
                    </Text>
                  </div>
                  <FaChevronRight
                    color={theme.colors.secondary["800"]}
                    size={22}
                    className="mx-2"
                  />
                </div>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setShow(false);
                  navigate("/contact");
                }}
              >
                <div
                  className="p-3"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                    borderRadius: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FaEnvelope
                      color={theme.colors.secondary["800"]}
                      size={22}
                      className="mx-2"
                    />
                    <Text color="secondary.800" fontWeight={300} fontSize={20}>
                      Contact Us
                    </Text>
                  </div>
                  <FaChevronRight
                    color={theme.colors.secondary["800"]}
                    size={22}
                    className="mx-2"
                  />
                </div>
              </Nav.Link>
            </Nav>
            {user && (
              <>
                <hr style={{ backgroundColor: theme.colors.muted["400"] }} />
                <div className="p-2 py-3">
                  <Text color="secondary.800">
                    Signed in as {user.firstName}
                  </Text>
                </div>
                <Nav>
                  <Nav.Link
                    onClick={() => {
                      setShow(false);
                      navigate("/manageListings");
                    }}
                  >
                    <div
                      className="p-3"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaHome
                          color={theme.colors.secondary["800"]}
                          size={22}
                          className="mx-2"
                        />
                        <Text
                          color="secondary.800"
                          fontWeight={300}
                          fontSize={20}
                        >
                          Manage Listings
                        </Text>
                      </div>
                      <FaChevronRight
                        color={theme.colors.secondary["800"]}
                        size={22}
                        className="mx-2"
                      />
                    </div>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShow(false);
                      navigate("/createListing");
                    }}
                  >
                    <div
                      className="p-3"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaHome
                          color={theme.colors.secondary["800"]}
                          size={22}
                          className="mx-2"
                        />
                        <Text
                          color="secondary.800"
                          fontWeight={300}
                          fontSize={20}
                        >
                          Create Listing
                        </Text>
                      </div>
                      <FaChevronRight
                        color={theme.colors.secondary["800"]}
                        size={22}
                        className="mx-2"
                      />
                    </div>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      setShow(false);
                      navigate("/portal");
                    }}
                  >
                    <div
                      className="p-3"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FaTachometerAlt
                          color={theme.colors.secondary["800"]}
                          size={22}
                          className="mx-2"
                        />
                        <Text
                          color="secondary.800"
                          fontWeight={300}
                          fontSize={20}
                        >
                          Wadzoo Portal
                        </Text>
                      </div>
                      <FaChevronRight
                        color={theme.colors.secondary["800"]}
                        size={22}
                        className="mx-2"
                      />
                    </div>
                  </Nav.Link>
                </Nav>
                <Pressable
                  onPress={() => {
                    signMeOut().then(() => setShow(false));
                  }}
                  px={5}
                  py={4}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                    borderRadius: 8,
                  }}
                >
                  {({ isPressed }) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        opacity: isPressed ? 0.5 : 1,
                      }}
                    >
                      <FaSignOutAlt
                        color={theme.colors.secondary["800"]}
                        size={22}
                        className="mx-2"
                      />
                      <Text
                        color="secondary.800"
                        fontWeight={300}
                        fontSize={20}
                      >
                        Sign Out
                      </Text>
                    </div>
                  )}
                </Pressable>
              </>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
