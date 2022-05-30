import React, { useEffect, useState } from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import HouseCover from "../Assets/HousesCover.png";
import { Col, Container, Row } from "react-bootstrap";
import { HStack, useTheme } from "native-base";
import { FaAndroid, FaApple } from "react-icons/fa";

const Beta = ({ setNavbarTransparent }) => {
  const theme = useTheme();
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  return (
    <div>
      <ParallaxBanner
        style={{
          height: "40vh",
          marginTop: navbarHeight,
        }}
        layers={[
          {
            image: HouseCover,
            speed: -20,
          },
          {
            children: (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#00000080",
                }}
              >
                <Container
                  style={{
                    height: "50%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Row style={{ width: "100%" }}>
                    <Col className="d-flex flex-column align-items-start">
                      <h1
                        style={{
                          color: theme.colors.primary["50"],
                          fontFamily: "Avenir-Black",
                          textAlign: "left",
                        }}
                      >
                        Get Wadzoo today
                      </h1>
                      <h3
                        style={{
                          color: theme.colors.muted["300"],
                          fontFamily: "Avenir-Heavy",
                          textAlign: "left",
                        }}
                      >
                        Wadzoo is available on both iOS and Android devices.
                      </h3>
                    </Col>
                  </Row>
                </Container>
              </div>
            ),
            speed: 1,
          },
        ]}
      />
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
                  <FaAndroid size={40} color={theme.colors.secondary["800"]} />
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
    </div>
  );
};

export default Beta;
