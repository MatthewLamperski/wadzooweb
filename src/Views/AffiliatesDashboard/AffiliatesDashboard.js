import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "native-base";
import { Col, Row } from "react-bootstrap";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import AddAffiliatePanel from "../../Components/AddAffiliatePanel";
import { AppContext } from "../../AppContext";

const AffiliatesDashboard = ({ setNavbarTransparent }) => {
  const { user } = useContext(AppContext);
  const theme = useTheme();
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  if (user && user.role) {
    if (user.role.includes("affiliate") || user.role.includes("admin")) {
      return (
        <div style={{ paddingTop: navbarHeight }}>
          <div style={styles.backgroundStyle} className="p-3">
            <Row className="d-flex flex-grow-1">
              {/*<Col className="my-2" xs={12} md={6}>*/}
              {/*  <AffiliateSummaryPanel />*/}
              {/*</Col>*/}
              {user.role.includes("affiliateManager") && (
                <Col className="my-2" xs={12} md={6}>
                  <AddAffiliatePanel />
                </Col>
              )}
            </Row>
          </div>
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
const styles = {
  backgroundStyle: {
    flex: 1,
    background: `linear-gradient(-45deg, #00D4FF40, #39F73940)`,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    minHeight: "100vh",
  },
};

export default AffiliatesDashboard;
