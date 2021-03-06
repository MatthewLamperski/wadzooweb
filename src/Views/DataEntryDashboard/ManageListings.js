import React, { useContext, useEffect, useState } from "react";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import { AppContext } from "../../AppContext";
import {
  Image,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { getAppInfo, getProdListings } from "../../FirebaseInterface";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./ManageListings.css";
import { FaArrowCircleRight } from "react-icons/all";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Components/SearchBar";

export const dateDiff = (postDate, long) => {
  let now = new Date();
  let seconds = Math.round(
    (now.getTime() - postDate.toDate().getTime()) / 1000
  );
  if (!long) {
    if (seconds < 59) {
      return "just now";
    } else if (seconds / 60 < 59) {
      return `${Math.round(seconds / 60).toString()}m`;
    } else if (seconds / 3600 < 23) {
      return `${Math.round(seconds / 3600).toString()}h`;
    } else if (seconds / 86400 < 5) {
      return `${Math.round(seconds / 86400).toString()}d`;
    } else {
      let dateObj = postDate.toDate();
      return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj
        .getFullYear()
        .toString()
        .substring(-2)}`;
    }
  } else {
    let dateObj = postDate.toDate();
    return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj
      .getFullYear()
      .toString()
      .substring(-2)}`;
  }
};

const ManageListings = ({ setNavbarTransparent }) => {
  const navigate = useNavigate();
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
  const [listingsCount, setListingsCount] = useState();
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
    getAppInfo()
      .then(({ listingsCount }) => {
        console.log(listingsCount);
        setListingsCount(listingsCount);
      })
      .catch((err) => {
        console.log(err);
        setError({
          title: "Couldn't load number of listings.",
          message: "Please try again later.",
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
  const renderTooltip = (props) => (
    <Tooltip {...props}>This number may take some time to update.</Tooltip>
  );
  if (user && user.role) {
    if (user.role.includes("dataEntry") || user.role.includes("admin")) {
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
              backgroundColor: "#EDf0F3",
            }}
          >
            <Container className="py-5">
              <div className="py-2 d-flex flex-row justify-content-between align-items-center">
                <div className="flex-column d-flex justify-content-center align-items-start">
                  <Text color="secondary.800" fontWeight={300} fontSize={24}>
                    Listings
                  </Text>
                  {listingsCount && (
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Text color="muted.400" fontWeight={300} fontSize={14}>
                        {listingsCount} results
                      </Text>
                    </OverlayTrigger>
                  )}
                </div>
                <SearchBar index="listings" />
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
                    <Pressable
                      onPress={() => navigate(`/listings/${listing.docID}`)}
                    >
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
                                {listing.fullAddress}
                              </Text>
                              <Text
                                fontSize={14}
                                color="muted.500"
                                fontWeight={300}
                              >
                                {dateDiff(listing.created, true)}
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
                            className="animate-translate"
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
