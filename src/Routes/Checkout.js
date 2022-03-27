import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import { FaArrowCircleRight } from "react-icons/all";
import AccessDenied from "../Views/AccessDenied";
import LoadingScreen from "../Views/LoadingScreen";
import PortalAuth from "./PortalAuth";

const Checkout = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const { service } = useParams();
  const { user } = useContext(AppContext);
  const theme = useTheme();
  if (user) {
    return (
      <PresenceTransition
        visible
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 500 } }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: navbarHeight,
          }}
        >
          <Container
            className="my-5 p-4"
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              display: "flex",
              backgroundColor: theme.colors.primary["500"],
              background: `linear-gradient(-50deg, ${theme.colors.primary["400"]}, ${theme.colors.secondary["400"]})`,
              borderRadius: 8,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Text fontSize={20}>Welcome, {user.firstName}</Text>
            <Text>
              Let's get your account verified for the{" "}
              {service === "verifyAdvanced" ? "Advanced" : "Intermediate"} Badge
            </Text>
          </Container>
        </div>
      </PresenceTransition>
    );
  } else if (user === null) {
    return (
      <PortalAuth
        text="You need to log into Wadzoo to continue."
        setNavbarTransparent={setNavbarTransparent}
      />
    );
  } else {
    return <LoadingScreen setNavbarTransparent={setNavbarTransparent} />;
  }
};

export default Checkout;
