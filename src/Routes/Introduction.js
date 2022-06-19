import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../node_modules/video-react/dist/video-react.css";
import { HStack, Text, useTheme } from "native-base";
import { FaAndroid, FaApple } from "react-icons/fa"; // import css

const Introduction = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  const theme = useTheme();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        paddingTop: navbarHeight,
      }}
    >
      <Container
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              overflow: "hidden",
              border: 0,
              alignSelf: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/1eDOkd6IPKY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Text pt={3} fontSize={24} fontWeight={300}>
          Welcome to Wadzoo.
        </Text>
        <Text fontSize={18}>Click play to see what we're about.</Text>
        <div style={{ width: "100%" }}>
          <Container className="p-5">
            <Row>
              <Col />
              <Col xs="12" lg="5" className="p-5">
                <div className="py-3">
                  <HStack
                    justifyContent="flex-start"
                    alignItems="center"
                    space={4}
                  >
                    <FaApple size={40} color={theme.colors.secondary["800"]} />
                    <h1
                      className="mt-auto"
                      style={{
                        margin: 0,
                        fontFamily: "Avenir-Heavy",
                        color: theme.colors.secondary["800"],
                      }}
                    >
                      Apple
                    </h1>
                  </HStack>
                </div>
                <div className="py-3">
                  <h1
                    style={{
                      fontFamily: "Avenir-Heavy",
                      fontSize: "1.5rem",
                      color: theme.colors.muted["500"],
                    }}
                  >
                    Get Wadzoo on iOS devices!
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        '<a href="https://apps.apple.com/us/app/wadzoo/id1605839076?itsct=apps_box_badge&amp;itscg=30200" style="display: flex; overflow: hidden; padding: 15px; justify-content: flex-start; align-items: center;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1653782400&h=bc3a755c4b724cbe09e03fdb58d7a072" alt="Download on the App Store" style="width: 200px;"></a>',
                    }}
                  />
                </div>
              </Col>
              <Col xs="12" lg="5" className="p-5">
                <div className="py-3">
                  <HStack
                    justifyContent="flex-start"
                    alignItems="center"
                    space={4}
                  >
                    <FaAndroid
                      size={40}
                      color={theme.colors.secondary["800"]}
                    />
                    <h1
                      className="mt-auto"
                      style={{
                        margin: 0,
                        fontFamily: "Avenir-Heavy",
                        color: theme.colors.secondary["800"],
                      }}
                    >
                      Android
                    </h1>
                  </HStack>
                </div>
                <div className="py-3">
                  <h1
                    style={{
                      fontFamily: "Avenir-Heavy",
                      fontSize: "1.5rem",
                      color: theme.colors.muted["500"],
                    }}
                  >
                    Get Wadzoo on Android devices!
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "<a href='https://play.google.com/store/apps/details?id=com.wadzoo&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' style=\"display: flex; justify-content: flex-start; align-items: center; overflow: hidden; border-radius: 13px; width: 220px;\"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' style=\"border-radius: 13px; width: 220px;\"/></a>",
                    }}
                  />
                </div>
              </Col>
              <Col />
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default Introduction;
