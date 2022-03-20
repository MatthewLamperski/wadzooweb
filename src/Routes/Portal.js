import React, { useContext, useEffect, useState } from "react";
import { PresenceTransition, Text, useTheme } from "native-base";
import { Container } from "react-bootstrap";
import { AppContext } from "../AppContext";
import DataEntryDashboard from "../Views/DataEntryDashboard/DataEntryDashboard";
import AdminDashboard from "../Views/AdminDashboard";

const Portal = ({ setNavbarTransparent }) => {
  const { user } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const theme = useTheme();
  const renderDashboard = () => {
    if (user.role) {
      if (user.role === "dataEntry") {
        return <DataEntryDashboard />;
      } else if (user.role === "admin") {
        return <AdminDashboard />;
      } else {
        return (
          <Text>
            Your role is {user.role}, but we haven't set your dashboard up yet!
          </Text>
        );
      }
    } else {
      return <Text>There is nothing to see here yet... Check back later!</Text>;
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: navbarHeight,
      }}
    >
      <PresenceTransition
        visible={true}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 500 } }}
        style={{ height: "100%" }}
      >
        {renderDashboard()}
      </PresenceTransition>
    </div>
  );
};

export default Portal;
