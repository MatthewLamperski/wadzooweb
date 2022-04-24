import React from "react";
import { useTheme } from "native-base";
import AddAffiliatePanel from "../../Components/AddAffiliatePanel";
import { Col, Row } from "react-bootstrap";

const AffiliatesView = () => {
  const theme = useTheme();
  return (
    <div style={styles.backgroundStyle} className="p-3">
      <Row className="d-flex flex-grow-1">
        <Col xs={12} md={6}>
          <AddAffiliatePanel />
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    background: `linear-gradient(-45deg, #00D4FF40, #39F73940)`,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
  },
};

export default AffiliatesView;
