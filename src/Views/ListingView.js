import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import {
  AlertDialog,
  Button,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { Container } from "react-bootstrap";
import AccessDenied from "./AccessDenied";
import LoadingScreen from "./LoadingScreen";
import { deleteListing, getListing } from "../FirebaseInterface";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./ListingView.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/all";
import { toast } from "react-toastify";

const ListingView = ({ setNavbarTransparent }) => {
  const [navbarHeight, setnavbarHeight] = useState();
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const navigate = useNavigate();
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
  }, []);
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    arrows: true,
    infinite: true,
    easing: "ease",
    loop: false,
  };
  const { docID } = useParams();
  const { user, setError } = useContext(AppContext);
  const sliderRef = useRef(null);
  const theme = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const cancelRef = useRef(null);
  const deleteRef = useRef(null);
  const [editing, setEditing] = useState();
  if (user && user.role) {
    if (user.role.includes("dataEntry") || user.role.includes("admin")) {
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
              backgroundColor: "#EDf0F3",
            }}
          >
            <Container
              className="py-3 mt-5 my-5"
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                flexDirection: "column",
                backgroundColor: "white",
                borderRadius: 8,
                position: "relative",
              }}
            >
              <div>
                {listing ? (
                  <div className="d-flex flex-column justify-content-center">
                    {listing.images && typeof listing.images === "object" && (
                      <div className="d-flex flex-row justify-content-between align-items-center p-2">
                        <Pressable
                          p={3}
                          onPress={() => sliderRef.current.goBack()}
                        >
                          <FaArrowAltCircleLeft size={35} />
                        </Pressable>
                        <div
                          style={{
                            padding: 20,
                            position: "relative",
                          }}
                          className="slide-container"
                        >
                          <Slide
                            {...properties}
                            ref={sliderRef}
                            arrows={false}
                            transitionDuration={500}
                          >
                            {listing.images.map((url, idx) => (
                              <div
                                key={idx}
                                style={{
                                  width: "auto",
                                  height: 300,
                                  aspectRatio: 1,
                                  display: "flex",
                                }}
                              >
                                <img
                                  key={url}
                                  className="my-auto mx-auto"
                                  style={{
                                    objectFit: "contain",
                                    flex: 1,
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 8,
                                  }}
                                  src={url}
                                  alt="Couldn't Load"
                                />
                              </div>
                            ))}
                          </Slide>
                        </div>
                        <Pressable
                          p={3}
                          onPress={() => sliderRef.current.goNext()}
                        >
                          <FaArrowAltCircleRight
                            color={theme.colors.secondary["800"]}
                            size={35}
                          />
                        </Pressable>
                      </div>
                    )}
                    <Text color="secondary.800" fontWeight={300} fontSize={24}>
                      {listing.fullAddress}
                    </Text>
                    {listing.images && listing.images.length > 0 && <div />}
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
                    <Text>Seller: {listing.email}</Text>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: 10,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        variant="subtle"
                        onPress={() => {
                          navigate("/createListing", {
                            state: { listing: listing },
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        mx={3}
                        variant="subtle"
                        colorScheme="red"
                        onPress={() => setOpenDeleteDialog(true)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Spinner />
                )}
              </div>
            </Container>
          </div>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <AlertDialog.Content bg="white">
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                <Text>Delete Property</Text>
              </AlertDialog.Header>
              <AlertDialog.Body color="muted.500">
                <Text color="muted.500">
                  This will remove all data relating to this property. This
                  action is irreversible
                </Text>
              </AlertDialog.Body>
              <AlertDialog.Footer bg="muted.200">
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={() => setOpenDeleteDialog(false)}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="error"
                    bg="error.500"
                    onPress={() => {
                      deleteListing(docID)
                        .then((res) => {
                          console.log("deleted??", res);
                          toast.success(
                            `Property Deleted. ${
                              !res && "There were no images to delete"
                            }`
                          );
                          navigate("/manageListings");
                        })
                        .catch((err) =>
                          setError({
                            title: "Something went wrong.",
                            message:
                              "Here is the error, take a screenshot: " + err,
                          })
                        );
                    }}
                  >
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
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
