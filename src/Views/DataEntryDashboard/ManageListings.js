import React, { useContext, useEffect, useState } from "react";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import { AppContext } from "../../AppContext";
import {
  Box,
  Image,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { getProdListings } from "../../FirebaseInterface";
import { Container, Row } from "react-bootstrap";
import "./ManageListings.css";
import { FaArrowCircleRight } from "react-icons/all";

const ManageListings = ({ setNavbarTransparent }) => {
  const { user, setError } = useContext(AppContext);
  const theme = useTheme();
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);

  const [listings, setListings] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [getMoreLoading, setGetMoreLoading] = useState(false);
  useEffect(() => {
    getProdListings()
      .then((result) => {
        setListings(result.listings);
        setLastVisible(result.lastVisible);
      })
      .catch((err) => {
        console.log(err);
        setError({
          title: "Error retrieving listings.",
          message:
            "Try again, if issue persists, contact Matthew. Error: " +
            JSON.stringify(err),
        });
      });
  }, []);
  const getMoreListings = () => {
    setGetMoreLoading(true);
    getProdListings(lastVisible).then((result) => {
      console.log(result);
      setListings((prevState) => [...prevState, ...result.listings]);
      setLastVisible(result.lastVisible);
      setGetMoreLoading(false);
    });
  };
  if (user && user.role) {
    if (user.role === "dataEntry" || user.role === "admin") {
      return (
        <PresenceTransition
          visible
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 500 } }}
        >
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              paddingTop: navbarHeight,
            }}
          >
            <Container className="py-5">
              <div className="py-2">
                <Text color="secondary.800" fontWeight={300} fontSize={24}>
                  Listings
                </Text>
              </div>
              <div
                className="p-3"
                style={{
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                  overflow: "scroll",
                  flexDirection: "column",
                  backgroundColor: "white",
                  borderRadius: 8,
                }}
              >
                {listings ? (
                  listings.map((listing) => (
                    <Pressable href={`/listings/${listing.docID}`}>
                      {({ isHovered }) => (
                        <div
                          key={listing.docID}
                          className="justify-content-between align-items-center p-3 d-flex flex-row animate-shadow"
                          style={{
                            borderRadius: 8,
                          }}
                        >
                          <div className="d-flex flex-row align-items-center">
                            {listing.images && (
                              <Image
                                key={listing.images[0]}
                                alt={listing.images[0]}
                                rounded={4}
                                source={{ uri: listing.images[0] }}
                                height={75}
                                width={100}
                              />
                            )}
                            <div className="d-flex flex-column align-items-start px-3">
                              <Text fontSize={16} color="secondary.800">
                                {listing.address}, {listing.city}{" "}
                                {listing.state}
                              </Text>
                              <Text color="muted.400">
                                $
                                {Number(listing.purchasePrice).toLocaleString()}
                              </Text>
                              <Text color="muted.400">
                                {listing.beds} Beds {listing.baths} Baths
                              </Text>
                              {listing.images && (
                                <Text color="muted.400">
                                  {listing.images.length} image
                                  {listing.images.length === 1 ? "" : "s"}
                                </Text>
                              )}
                            </div>
                          </div>
                          <FaArrowCircleRight
                            size={20}
                            color={theme.colors.secondary["800"]}
                          />
                        </div>
                      )}
                    </Pressable>
                  ))
                ) : (
                  <Spinner color="primary.500" size="lg" />
                )}
                {lastVisible && (
                  <div className="justify-content-center align-items-center p-3 d-flex flex-row">
                    <Pressable
                      bg="muted.100"
                      rounded={100}
                      p={2}
                      px={4}
                      onPress={getMoreListings}
                    >
                      {getMoreLoading ? (
                        <Spinner color="primary.500" />
                      ) : (
                        <Text fontSize={12} color="muted.800">
                          GET MORE
                        </Text>
                      )}
                    </Pressable>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </PresenceTransition>
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

export default ManageListings;
