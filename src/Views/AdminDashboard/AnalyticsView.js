import React from "react";
import { Text } from "native-base";
import { Container } from "react-bootstrap";

const AnalyticsView = () => {
  return (
    <div style={styles.backgroundStyle} className="p-3">
      <Container style={styles.containerStyle}>
        <div className="py-2 d-flex flex-row justify-content-between align-items-center">
          <Text color="secondary.800" fontWeight={300} fontSize={24}>
            Analytics
          </Text>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    backgroundColor: "lightred",
  },
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
  },
};

export default AnalyticsView;
