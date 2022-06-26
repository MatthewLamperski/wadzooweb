import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useTheme } from "native-base";
import LogoBlack from "../Assets/LogoLongBlack.png";
import ReachOut from "../Components/ReachOut";

const BugReport = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const theme = useTheme();
  return (
    <div
      style={{
        ...styles.container,
        paddingTop: navbarHeight,
      }}
    >
      <Container className="p-4">
        <div
          className="mb-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={LogoBlack} style={{ height: 100, width: "auto" }} />
        </div>
        <ReachOut
          textAreaTitle="Please explain the bug you encountered."
          title="Found a bug?"
          subtitle="Describe it here and we will get back to you as soon as possible. Thank you for bringing this to our attention!"
          source="CONTACTUS PAGE"
          textAreaPlaceholder="Describe bug"
        />
      </Container>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
  },
};

export default BugReport;
