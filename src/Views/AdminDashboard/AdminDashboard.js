import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import { PresenceTransition, Text, useTheme } from "native-base";
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
  FaUserCheck,
} from "react-icons/all";
import { FaChevronRight } from "react-icons/fa";
import LogoWhite from "../../Assets/LogoWhite.png";
import { Image } from "react-bootstrap";

const AdminDashboard = ({ setNavbarTransparent, setNavbarHidden }) => {
  const { user } = useContext(AppContext);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const theme = useTheme();
  useEffect(() => {
    setNavbarHidden(true);
  }, []);
  if (user && user.role) {
    if (user.role === "admin") {
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
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#EDf0F3",
              }}
            >
              <ProSidebar collapsed={collapseSidebar}>
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
                    icon={<FaChartLine />}
                  >
                    Analytics
                    <Link to="analytics" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCollapseSidebar(true)}
                    icon={<FaCertificate />}
                  >
                    Verifications
                    <Link to="verifications" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => setCollapseSidebar(true)}
                    icon={<FaUserCheck />}
                  >
                    Whitelist
                    <Link to="whitelist" />
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
              <Outlet />
            </div>
          </PresenceTransition>
        </div>
      );
    } else {
      return <AccessDenied />;
    }
  } else if (user === null) {
    return <AccessDenied />;
  } else {
    return <LoadingScreen setNavbarTransparent={setNavbarTransparent} />;
  }
};

export default AdminDashboard;
