import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import { Button, PresenceTransition, Text, useTheme } from "native-base";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, Outlet } from "react-router-dom";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import {
  FaCertificate,
  FaChartLine,
  FaChevronLeft,
  FaDesktop,
  FaUserAlt,
  IoGitNetwork,
} from "react-icons/all";
import { FaChevronRight } from "react-icons/fa";
import LogoWhite from "../../Assets/LogoWhite.png";
import { Image } from "react-bootstrap";
import { deviceType } from "../../Routes/LandingPage";

const AdminDashboard = ({ setNavbarTransparent, setNavbarHidden }) => {
  const { user } = useContext(AppContext);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const [showWarning, setShowWarning] = useState(
    deviceType() === "iOS" || deviceType() === "android"
  );
  const theme = useTheme();
  useEffect(() => {
    setNavbarHidden(true);
  }, []);
  if (user && user.role) {
    if (user.role.includes("admin")) {
      return (
        <div
          style={{
            backgroundColor: "#EDf0F3",
          }}
        >
          <PresenceTransition
            visible
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 500 } }}
          >
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#EDf0F3",
                position: "relative",
              }}
            >
              <ProSidebar
                style={{ height: "100vh", position: "sticky", top: 0 }}
                collapsed={collapseSidebar}
              >
                <SidebarHeader
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: theme.colors.secondary["900"],
                  }}
                >
                  <Image src={LogoWhite} height="40" />
                </SidebarHeader>
                <Menu
                  style={{
                    fontFamily: "Avenir-Heavy",
                    backgroundColor: theme.colors.secondary["900"],
                    flex: 1,
                  }}
                  iconShape="round"
                >
                  <MenuItem
                    onClick={() => setCollapseSidebar(true)}
                    icon={<FaCertificate />}
                  >
                    Verifications
                    <Link to="verifications" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCollapseSidebar(true)}
                    icon={<FaUserAlt />}
                  >
                    Users
                    <Link to="users" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCollapseSidebar(true)}
                    icon={<FaChartLine />}
                  >
                    Analytics
                    <Link to="analytics" />
                  </MenuItem>

                  <MenuItem
                    onClick={() => setCollapseSidebar(true)}
                    icon={<IoGitNetwork />}
                  >
                    Affiliates
                    <Link to="affiliates" />
                  </MenuItem>
                  <hr />
                  <MenuItem
                    onClick={() => setCollapseSidebar(!collapseSidebar)}
                    icon={
                      collapseSidebar ? <FaChevronRight /> : <FaChevronLeft />
                    }
                  >
                    Collapse
                  </MenuItem>
                </Menu>
                <SidebarFooter
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: theme.colors.secondary["900"],
                  }}
                >
                  <Text fontWeight={300} fontSize={18} color="white">
                    W
                  </Text>
                </SidebarFooter>
              </ProSidebar>
              {showWarning ? (
                <div style={styles.backgroundStyle} className="p-3">
                  <div style={styles.containerStyle}>
                    <FaDesktop
                      style={{ marginBottom: 10 }}
                      color={theme.colors.muted["400"]}
                      size={34}
                    />
                    <Text
                      mt={2}
                      color="secondary.800"
                      fontWeight={300}
                      fontSize={20}
                    >
                      Use on Computer
                    </Text>
                    <Text fontSize={12} color="muted.400" fontWeight={300}>
                      The admin dashboard is built for a computer. The dashboard
                      will not display correctly on an{" "}
                      {deviceType() === "iOS" ? "iPhone" : "Android"}.
                    </Text>
                    <Button
                      mt={4}
                      px={4}
                      variant="subtle"
                      size="sm"
                      onPress={() => setShowWarning(false)}
                    >
                      Bypass
                    </Button>
                  </div>
                </div>
              ) : (
                <Outlet />
              )}
            </div>
          </PresenceTransition>
        </div>
      );
      if (deviceType() !== "iOS" && deviceType() !== "android") {
      }
    } else {
      return <AccessDenied />;
    }
  } else if (user === null) {
    return <AccessDenied />;
  } else {
    return <LoadingScreen setNavbarTransparent={setNavbarTransparent} />;
  }
};

const styles = {
  backgroundStyle: {
    background: `linear-gradient(-45deg, #00D4FF40, #39F73940)`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    height: "100vh",
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: 10,
  },
};

export default AdminDashboard;
