import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../AppContext";
import {
  AlertDialog,
  Button,
  Divider,
  HStack,
  PresenceTransition,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Col, Container, Image, Row } from "react-bootstrap";
import LoadingScreen from "./LoadingScreen";
import {
  createListingLink,
  deleteListing,
  getListing,
  getProfilePicURL,
} from "../FirebaseInterface";
import "react-slideshow-image/dist/styles.css";
import "./ListingView.css";
import "../Routes/Checkout.css";
import { toast } from "react-toastify";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaBath,
  FaBed,
  FaHome,
  FaInfoCircle,
  FaLock,
  FaMapMarkerAlt,
  FaRulerCombined,
} from "react-icons/all";
import { Slide } from "react-slideshow-image";
import { FaUser } from "react-icons/fa";
import ReachOut from "../Components/ReachOut";
import ActionSheet from "actionsheet-react";
import LogoBlack from "../Assets/LogoLongBlack.png";

const ListingView = ({ setNavbarTransparent }) => {
  const { user, setError } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const [linkLoading, setLinkLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const [locked, setLocked] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [openAppPrompt, setOpenAppPrompt] = useState(false);
  const ref = useRef();

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setLocked(!(user && "role" in user));
  }, [user]);
  const [currentIdx, setCurrentIdx] = useState(0);
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  const navigate = useNavigate();
  const [listing, setListing] = useState();
  useEffect(() => {
    if (ref.current && width <= 768) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
      ref.current.open();
    }
  }, [listing, user]);
  useEffect(() => {
    if (width <= 768 && listing) {
      setOpenAppPrompt(true);
    }
  }, [width, listing]);
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
  useEffect(() => {
    if (listing) {
      getProfilePicURL(listing.lister)
        .then((url) => setPhotoURL(url))
        .catch((err) => console.log(err));
    }
  }, [listing]);
  const [link, setLink] = useState();
  useEffect(() => {
    if (listing) {
      const title = `Check out this ${listing.city.trim()} property on Wadzoo! 👀`;
      const description = `This ${
        listing.beds !== 0 && listing.baths !== 0
          ? `${listing.beds} bed ${listing.baths} bath`
          : "property"
      } is going for $${Number(listing.purchasePrice)
        .toLocaleString()
        .trim()}!`;
      createListingLink(listing.docID, title, description, listing.images[0])
        .then((res) => setLink(res.shortLink))
        .catch((err) => console.log(err));
    }
  }, [listing]);
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    arrows: true,
    infinite: true,
    easing: "ease",
    loop: true,
    onChange: (from, to) => setCurrentIdx(to),
  };
  const { docID } = useParams();

  const sliderRef = useRef(null);
  const { colors } = useTheme();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const cancelRef = useRef(null);
  if (listing) {
    return (
      <Fragment>
        <PresenceTransition
          visible
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 400 } }}
          position="relative"
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
              <Row>
                <Col className="pb-4 py-lg-0" xs={12} lg={4}>
                  <div
                    className="mb-4"
                    style={{
                      height: 300,
                      width: "100%",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      borderRadius: 20,
                    }}
                  >
                    {listing.images && typeof listing.images === "object" && (
                      <div
                        style={{
                          position: "relative",
                          borderRadius: 20,
                          overflow: "hidden",
                        }}
                      >
                        <Slide
                          {...properties}
                          ref={sliderRef}
                          arrows={false}
                          transitionDuration={500}
                        >
                          {listing.images.map((url, idx) => (
                            <img
                              key={url}
                              className="my-auto mx-auto"
                              style={{
                                objectFit: "cover",
                                flex: 1,
                                width: "100%",
                                height: 300,
                              }}
                              src={url}
                              alt="Couldn't Load"
                            />
                          ))}
                        </Slide>
                        <div
                          style={{
                            position: "absolute",
                            height: "100%",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            left: 0,
                            top: 0,
                            display: "flex",
                          }}
                        >
                          <Pressable
                            p={3}
                            onPress={() => sliderRef.current.goBack()}
                          >
                            <FaArrowAltCircleLeft color="white" size={28} />
                          </Pressable>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            height: "100%",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 0,
                            top: 0,
                            display: "flex",
                          }}
                        >
                          <Pressable
                            p={3}
                            onPress={() => sliderRef.current.goNext()}
                          >
                            <FaArrowAltCircleRight color="white" size={28} />
                          </Pressable>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            right: 0,
                            bottom: 0,
                            display: "flex",
                          }}
                        >
                          <Text
                            fontWeight={300}
                            p={1}
                            mb={2}
                            px={3}
                            borderRadius={20}
                            bg="#00000080"
                            color="white"
                          >
                            {`${currentIdx + 1} / ${listing.images?.length}`}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="py-3 pb-4"
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Button
                        variant="subtle"
                        onPress={() => {
                          const title = `Check out this ${listing.city.trim()} property on Wadzoo! 👀`;
                          const description = `This ${
                            listing.beds !== 0 && listing.baths !== 0
                              ? `${listing.beds} bed ${listing.baths} bath`
                              : "property"
                          } is going for $${Number(listing.purchasePrice)
                            .toLocaleString()
                            .trim()}!`;
                          createListingLink(
                            listing.docID,
                            title,
                            description,
                            listing.images[0]
                          )
                            .then((res) => {
                              console.log(res);
                              if ("shortLink" in res) {
                                navigator.clipboard
                                  .writeText(res.shortLink)
                                  .then(() => {
                                    toast.success(
                                      `Link copied to your clipboard! ${res.shortLink}`
                                    );
                                  })
                                  .catch((err) =>
                                    toast.error(
                                      "Something went wrong... Try again later!"
                                    )
                                  );
                              }
                            })
                            .catch((err) =>
                              toast.error(
                                "Something went wrong... Try again later!"
                              )
                            );
                        }}
                      >
                        Share
                      </Button>
                    </div>
                    <div
                      style={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {!locked && user && "role" in user ? (
                        <>
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
                        </>
                      ) : link ? (
                        <Button
                          onPress={() => window.open(link)}
                          variant="subtle"
                        >
                          Open in App
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="p-4"
                    style={{
                      backgroundColor: "white",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      borderRadius: 20,
                      flexDirection: "column",
                      position: "relative",
                      display: "flex",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text
                      pb={2}
                      fontSize={18}
                      fontWeight={300}
                      color="primary.900"
                    >
                      Address
                    </Text>
                    <h3
                      style={{
                        ...(locked
                          ? {
                              textShadow: "0 0 32px black",
                              color: "transparent",
                            }
                          : {}),
                      }}
                    >
                      {locked
                        ? "Check out the address on the app!"
                        : listing.fullAddress}
                    </h3>
                    {locked && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="circle"
                          style={{
                            backgroundColor: colors.primary["400"],
                            padding: 15,
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                          }}
                        >
                          <FaLock size={20} color="white" />
                        </div>
                        <Text fontWeight={300} p={2} textAlign="center">
                          View in the app to unlock property information!
                        </Text>
                      </div>
                    )}
                    <div
                      className="circle"
                      style={{
                        backgroundColor: colors.primary["400"],
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: -15,
                        left: -15,
                        padding: 10,
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      }}
                    >
                      <FaMapMarkerAlt color="white" size={18} />
                    </div>
                  </div>
                  <div
                    className="p-4"
                    style={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                      backgroundColor: "white",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      borderRadius: 20,
                      flexDirection: "column",
                      position: "relative",
                      display: "flex",
                    }}
                  >
                    <Text
                      pb={2}
                      fontSize={18}
                      fontWeight={300}
                      color="primary.900"
                    >
                      Property Info
                    </Text>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FaBed size={16} color="black" />
                      <Text px={2} fontWeight={300} fontSize={20}>
                        {listing.beds}
                      </Text>
                      <Text fontWeight={300} fontSize={18}>
                        Beds
                      </Text>
                      <Divider mx={1} orientation="vertical" />
                      <FaBath size={16} color="black" />
                      <Text px={2} fontWeight={300} fontSize={20}>
                        {listing.baths}
                      </Text>
                      <Text fontWeight={300} fontSize={18}>
                        Baths
                      </Text>
                    </div>
                    <Divider />
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FaRulerCombined size={16} color="black" />
                      <Text px={2} fontWeight={300} fontSize={20}>
                        {Number(listing.sqftHeated).toLocaleString()}
                      </Text>
                      <Text fontWeight={300} fontSize={18}>
                        {`${
                          listing.propertyType === "Raw Land" ? "" : "Heated"
                        } Sqft`}
                      </Text>
                    </div>
                    <div
                      className="circle"
                      style={{
                        backgroundColor: colors.primary["400"],
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: -15,
                        left: -15,
                        padding: 10,
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      }}
                    >
                      <FaHome color="white" size={18} />
                    </div>
                  </div>
                </Col>
                <Col xs={12} lg={8}>
                  <VStack
                    position="relative"
                    p={6}
                    rounded={8}
                    bg="white"
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                    space={3}
                  >
                    <Text
                      pb={2}
                      fontSize={18}
                      fontWeight={300}
                      color="primary.900"
                    >
                      More Info
                    </Text>
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <VStack>
                        <Text fontWeight={300}>Property Type</Text>
                        <Text fontWeight={100}>{listing.propertyType}</Text>
                      </VStack>
                      <VStack>
                        <Text textAlign="right" fontWeight={300}>
                          Lot
                        </Text>
                        <Text textAlign="right" fontWeight={100}>
                          {"acres" in listing
                            ? listing.acres.length !== 0
                              ? listing.acres + " ac"
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <VStack>
                        <Text fontWeight={300}>Year Built</Text>
                        <Text fontWeight={100}>
                          {"yearBuilt" in listing
                            ? listing.yearBuilt.length !== 0
                              ? listing.yearBuilt
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                      <VStack>
                        <Text textAlign="right" fontWeight={300}>
                          After Repair Value
                        </Text>
                        <Text textAlign="right" fontWeight={100}>
                          {"arv" in listing
                            ? listing.arv.length !== 0
                              ? "$" + Number(listing.arv).toLocaleString()
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <VStack>
                        <Text fontWeight={300}>Occupancy Status</Text>
                        <Text fontWeight={100}>
                          {"occupancyStatus" in listing
                            ? listing.occupancyStatus.length !== 0
                              ? listing.occupancyStatus
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                      <VStack>
                        <Text textAlign="right" fontWeight={300}>
                          Repair Cost
                        </Text>
                        <Text textAlign="right" fontWeight={100}>
                          {"repairCost" in listing
                            ? listing.repairCost.length !== 0
                              ? "$" +
                                Number(listing.repairCost).toLocaleString()
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <VStack>
                        <Text fontWeight={300}>Buyer's Fee</Text>
                        <Text fontWeight={100}>
                          {"buyersFee" in listing ? listing.buyersFee : "-"}
                        </Text>
                      </VStack>
                      <VStack>
                        <Text textAlign="right" fontWeight={300}>
                          Collected Rent
                        </Text>
                        <Text textAlign="right" fontWeight={100}>
                          {"rent" in listing
                            ? listing.rent.length !== 0
                              ? "$" + Number(listing.rent).toLocaleString()
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <VStack>
                        <Text fontWeight={300}>Net Operating Income</Text>
                        <Text fontWeight={100}>
                          {"noi" in listing
                            ? listing.noi.length !== 0
                              ? listing.noi
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                      <VStack>
                        <Text textAlign="right" fontWeight={300}>
                          Capitalization Rate
                        </Text>
                        <Text textAlign="right" fontWeight={100}>
                          {"cap" in listing
                            ? listing.cap.length !== 0
                              ? "$" + listing.cap
                              : "-"
                            : "-"}
                        </Text>
                      </VStack>
                    </HStack>
                    <div
                      className="circle"
                      style={{
                        backgroundColor: colors.primary["400"],
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: -15,
                        left: -15,
                        padding: 10,
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      }}
                    >
                      <FaInfoCircle color="white" size={18} />
                    </div>
                  </VStack>
                  <div
                    className="p-4"
                    style={{
                      marginTop: 25,
                      marginLeft: 10,
                      marginRight: 10,
                      backgroundColor: "white",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      borderRadius: 20,
                      flexDirection: "column",
                      position: "relative",
                      display: "flex",
                    }}
                  >
                    <Text
                      pb={2}
                      fontSize={18}
                      fontWeight={300}
                      color="primary.900"
                    >
                      Seller Info
                    </Text>
                    {locked ? (
                      <div
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: 90,
                            height: 90,
                            borderRadius: 50,
                            border: `2px solid ${colors.primary["500"]}`,
                            backgroundColor: colors.muted["200"],
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 15,
                            filter: "blur(10px)",
                            WebkitFilter: "blur(10px)",
                          }}
                        >
                          <FaUser color={colors.lightText} size={20} />
                        </div>

                        <div
                          style={{
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            display: "flex",
                          }}
                        >
                          <h2
                            style={{
                              textShadow: "0 0 32px black",
                              color: "transparent",
                            }}
                          >
                            Matthew Lamperski
                          </h2>
                          <h3
                            style={{
                              textShadow: "0 0 32px black",
                              color: "transparent",
                            }}
                          >
                            matthew@wadzoo.com
                          </h3>
                          <h5
                            style={{
                              textShadow: "0 0 32px black",
                              color: "transparent",
                            }}
                          >
                            This part is hidden, so check out seller information
                            on the app!
                          </h5>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            className="circle"
                            style={{
                              backgroundColor: colors.primary["400"],
                              padding: 15,
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                            }}
                          >
                            <FaLock size={20} color="white" />
                          </div>
                          <Text fontWeight={300} p={2} textAlign="center">
                            View in the app to unlock all seller information!
                          </Text>
                          <div
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              variant="subtle"
                              onPress={() => navigate("/download")}
                            >
                              Download
                            </Button>
                            {link && width >= 768 && (
                              <Button
                                ml={3}
                                onPress={() => window.open(link)}
                                variant="subtle"
                              >
                                Open in App
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column">
                        <Text>{`UID: ${listing.lister}`}</Text>
                        <Text>{listing.email}</Text>
                        <Text>
                          {listing.firstName} {listing.lastName}
                        </Text>
                      </div>
                    )}
                    <div
                      className="circle"
                      style={{
                        backgroundColor: colors.primary["400"],
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: -15,
                        left: -15,
                        padding: 10,
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.29)",
                      }}
                    >
                      <FaUser color="white" size={18} />
                    </div>
                  </div>
                </Col>
              </Row>
              <ReachOut
                title="Have a question?"
                subtitle="You can contact us below and we will reach back out ASAP!"
                source={`LISTING ${listing.docID}`}
              />
            </Container>
          </div>
          {!locked && (
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
                        // ADD USER ID
                        deleteListing(docID, listing.lister)
                          .then((res) => {
                            console.log("deleted??", res);
                            toast.success(
                              `Property Deleted. ${
                                !res
                                  ? "There were no images to delete"
                                  : "All images were deleted as well."
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
          )}
        </PresenceTransition>
        <ActionSheet
          onClose={() => {
            document.body.style.overscrollBehavior = "auto";
            document.body.style.overflow = "auto";
          }}
          ref={ref}
        >
          <div style={style.content}>
            <div
              className="mb-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image src={LogoBlack} style={{ height: 100, width: "auto" }} />
            </div>
            <Text fontSize={20} fontWeight={300}>
              Wadzoo is much better in the app.
            </Text>
            <Text fontSize={16} color="muted.500">
              You can access seller and property information from the app!
            </Text>
            <div
              style={{
                paddingTop: 20,
                paddingBottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button variant="subtle" onPress={() => window.open(link)}>
                View this Property in the App
              </Button>
            </div>
            <HStack w="100%" alignItems="center" justifyContent="center">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<a href="https://apps.apple.com/us/app/wadzoo/id1605839076?itsct=apps_box_badge&amp;itscg=30200" style="display: flex; overflow: hidden; width: 145px; justify-content: flex-start; align-items: center;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1653782400&h=bc3a755c4b724cbe09e03fdb58d7a072" alt="Download on the App Store" style="width: 145px;"></a>',
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<a href='https://play.google.com/store/apps/details?id=com.wadzoo&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' style=\"display: flex; justify-content: flex-start; align-items: center; overflow: hidden; border-radius: 13px; width: 170px; height: 100px;\"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' style=\"border-radius: 13px; width: 170px;\"/></a>",
                }}
              />
            </HStack>
          </div>
        </ActionSheet>
      </Fragment>
    );
  } else {
    return <LoadingScreen setNavbarTransparent={setNavbarTransparent} />;
  }
};

const style = {
  content: {
    display: "flex",
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingRight: 30,
    paddingLeft: 30,
  },
};

export default ListingView;
