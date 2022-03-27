import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import { PresenceTransition, Pressable, Spinner, Text } from "native-base";
import { Container, Image } from "react-bootstrap";
import AccessDenied from "./AccessDenied";
import LoadingScreen from "./LoadingScreen";
import { getListing } from "../FirebaseInterface";

const ListingView = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    console.log("REACHED");
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const [listing, setListing] = useState();
  useEffect(() => {
    getListing(docID)
      .then((returned) => setListing(returned))
      .catch((err) =>
        setError({
          title: "Couldn't find property",
          message: "Try again, contact Matthew if issue persists.",
        })
      );
  });
  const { docID } = useParams();
  const { user, setError } = useContext(AppContext);
  if (user && user.role) {
    if (user.role === "dataEntry" || user.role === "admin") {
      return (
        <PresenceTransition
          visible
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 100 } }}
        >
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              paddingTop: navbarHeight,
            }}
          >
            <Container
              className="py-3 mt-5 my-5"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                overflow: "scroll",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: 8,
              }}
            >
              <div>
                {listing ? (
                  <div className="d-flex flex-column justify-content-center">
                    <Text color="secondary.800" fontWeight={300} fontSize={24}>
                      {listing.address}, {listing.city} {listing.state}
                    </Text>
                    <div
                      style={{ overflow: "scroll" }}
                      className="d-flex flex-row align-items-center py-3"
                    >
                      {listing.images.map((url) => (
                        <Image
                          src={url}
                          key={url}
                          style={{
                            maxHeight: 200,
                            alignSelf: "center",
                            borderRadius: 4,
                            marginRight: 8,
                          }}
                          alt={url}
                        />
                      ))}
                    </div>
                    <Text fontSize={20} color="muted.400">
                      ${Number(listing.purchasePrice).toLocaleString()}
                    </Text>
                    <Text fontSize={20} color="muted.400">
                      {listing.beds} Beds {listing.baths} Baths
                    </Text>
                    <Text fontSize={20} color="muted.400">
                      {listing.images.length} image
                      {listing.images.length === 1 ? "" : "s"}
                    </Text>
                  </div>
                ) : (
                  <Spinner />
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

export default ListingView;
