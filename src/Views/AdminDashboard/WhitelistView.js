import React from "react";
import { Container, Text } from "native-base";

const WhitelistView = () => {
  return (
    <Container className="py-5">
      <div className="py-2 d-flex flex-row justify-content-between align-items-center">
        <Text color="secondary.800" fontWeight={300} fontSize={24}>
          Whitelist
        </Text>
      </div>
    </Container>
  );
};

export default WhitelistView;
