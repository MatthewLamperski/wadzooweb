import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Faq from "react-faq-component";
import { FaCog, FaCompass, FaUsers } from "react-icons/all";
import { useTheme } from "native-base";
import { Link } from "react-router-dom";
import LogoBlack from "../Assets/LogoLongBlack.png";
import ReachOut from "../Components/ReachOut";

const Faquestions = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  const [newQuestion, setNewQuestion] = useState();
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  useEffect(() => {
    setNavbarTransparent(false);
  }, []);

  const data = {
    title: "Frequently Asked Questions",
    rows: [
      {
        title:
          "I don't see any investors or properties around me, is something wrong?",
        content:
          "No, nothing is wrong. Wadzoo is just starting out! We have just recently launched and are looking forward to adding more and more new properties, investors, and vendors. As of right now, there are more than 1000 off-market properties on Wadzoo! And there are new investors and vendors joining every day. Make sure to keep checking back for more!",
      },
      {
        title:
          "How can I upload my own investment property that I am looking to sell?",
        content: (
          <p>
            Wadzoo users can upload their property for free on Wadzoo to garner
            interest, and hopefully a buyer! Users can go to{" "}
            <Link to="/uploadProperty">wadzoo.com/uploadproperty</Link> or from
            in the app by pressing on the 'Create' Button in the bottom right
            corner of the Home and Profile page!
          </p>
        ),
      },
      {
        title: "How can I look for investors around me?",
        content: (
          <p>
            When in the app, you can find investors in your area by clicking on
            the 'investors' (<FaUsers color={colors.primary["500"]} />) icon in
            the top right corner of the home screen!
          </p>
        ),
      },
      {
        title: "How can I find off-market properties near me?",
        content: (
          <p>
            When in the app, you can find off-market properties in the Discover
            (<FaCompass color={colors.primary["500"]} />) tab. Here you can view
            all of the properties within a 60 mile radius of the location at
            which you signed up for Wadzoo!
          </p>
        ),
      },
      {
        title:
          "I want to look for property and investors outside of my area, how can I do this?",
        content: (
          <p>
            Wadzoo Pro users can change their location to anywhere in the world
            and view all of the properties, investors, and posts in that area.
            You can look through our subscription options in the app by pressing
            on the Settings (<FaCog color={colors.primary["500"]} />) screen in
            the top left corner of your Home screen.
          </p>
        ),
      },
      {
        title: (
          <h6>
            <b>Pro Members:</b> How can I change my location?
          </h6>
        ),
        content: (
          <p>
            Wadzoo Pro users can change their location to anywhere in the world
            and view all of the properties, investors, and posts in that area.
            You can change your location by tapping your current location at the
            top of the Home and Discover tabs. You will then be brought to our
            location switcher where you can choose from the suggested locations,
            or tap "Custom" to search for a location! You can even favorite
            locations to come back to them quicker. Your favorite locations will
            be stored in the location switcher drawer that pops up at the bottom
            of the screen when clicking on your current location.
          </p>
        ),
      },
    ],
  };
  const config = {
    animate: true,
  };
  const faqstyles = {
    arrowColor: "#09dd09",
  };
  return (
    <div style={{ ...styles.container, paddingTop: navbarHeight }}>
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
        <Faq data={data} styles={faqstyles} config={config} />
        <ReachOut
          title="Have another question?"
          subtitle="Ask us below and we will reach back out as soon as possible!"
          source="FAQ PAGE"
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

export default Faquestions;
