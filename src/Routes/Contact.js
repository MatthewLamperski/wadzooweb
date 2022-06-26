import React, { useEffect, useState } from "react";
import { useTheme } from "native-base";
import { Container, Image } from "react-bootstrap";
import LogoBlack from "../Assets/LogoLongBlack.png";
import ReachOut from "../Components/ReachOut";

const Contact = ({ setNavbarTransparent }) => {
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
          title="You can contact us below"
          subtitle="Let us know what's on your mind and we will get back with you ASAP!"
          source="CONTACTUS PAGE"
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

export default Contact;
