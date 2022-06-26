import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Image,
  Input,
  Modal,
  PresenceTransition,
  Pressable,
  Select,
  Skeleton,
  Spinner,
  Text,
  TextArea,
  useTheme,
  VStack,
} from "native-base";
import { Col, Row } from "react-bootstrap";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import {
  createListing,
  createUser,
  findUsersByEmail,
  getProfilePicURL,
  getUserDoc,
} from "../../FirebaseInterface";
import {
  FaBath,
  FaBed,
  FaExclamationTriangle,
  FaRulerCombined,
  FaTrashAlt,
} from "react-icons/all";
import { toast } from "react-toastify";
import "./CreateListing.css";
import { FaUser } from "react-icons/fa";
import Geocode from "react-geocode";
import ngeohash from "ngeohash";
import AddCompanyLogo from "./AddCompanyLogo";
import AddPropertyImages from "./AddPropertyImages";
import { useLocation } from "react-router-dom";
import ReorderPropertyImages from "./ReorderPropertyImages";

const propertyTypeVals = [
  "Single Family Residential",
  "Multi-Family",
  "Manufactured Homes (Mobile Homes, etc...)",
  "Condominium",
  "Townhouse",
  "Villa",
  "Patio Home",
  "Farm",
  "Raw Land",
  "Commercial",
];

const formatPhoneNumber = (num) => {
  if (num.length === 0) {
    return "";
  } else {
    if (num.length <= 3) {
      return num;
    } else if (num.length <= 6) {
      return `${num.substring(0, 3)}-${num.substring(3)}`;
    } else {
      return `${num.substring(0, 3)}-${num.substring(3, 6)}-${num.substring(
        6
      )}`;
    }
  }
};

const CreateListing = ({ setNavbarTransparent }) => {
  const { user, setError } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const [listerEmail, setListerEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState();
  const [emailSearchResults, setEmailSearchResults] = useState();
  const [emailSearchLoading, setEmailSearchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showData, setShowData] = useState(false);
  const [listerPPUrl, setListerPPUrl] = useState();
  const [showReorderModal, setShowReorderModal] = useState(false);

  // Create New User State
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUser, setNewUser] = useState();

  // Upload listerObj company logo
  const [showCompanyLogoModal, setShowCompanyLogoModal] = useState(false);

  // Upload property images
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [tmpImage, setTmpImage] = useState();
  const [uploadImages, setUploadImages] = useState();

  useEffect(() => {
    if (listerEmail) setEmailSearchLoading(true);
    const delayDebounce = setTimeout(() => {
      if (listerEmail && listerEmail.length > 5) {
        findUsersByEmail(listerEmail)
          .then((users) => {
            setEmailSearchLoading(false);
            setEmailSearchResults(users);
            console.log(users);
          })
          .catch((err) => {
            setEmailSearchLoading(false);
            console.log(err);
          });
      } else {
        setEmailSearchLoading(false);
        setEmailSearchResults();
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [listerEmail]);
  useEffect(() => {
    setNavbarTransparent(false);
    setnavbarHeight(
      document.getElementsByClassName("navbar").item(0).clientHeight
    );
  }, []);
  useEffect(() => {
    if (listing && listing.listerObj && listing.listerObj.uid && !listerPPUrl) {
      getProfilePicURL(listing.listerObj.uid)
        .then((url) => setListerPPUrl(url))
        .catch((err) => {
          setListerPPUrl(null);
          console.log(err);
        });
    }
  }, [listing]);
  const { state } = useLocation();
  useEffect(() => {
    if (listerPPUrl) console.log(listerPPUrl);
    else console.log("none");
  }, [listerPPUrl]);
  useEffect(() => {
    if (state) {
      if (state.listing && listing === undefined) {
        setLoading(true);
        getUserDoc(state.listing.lister)
          .then((listerDoc) => {
            setListing({
              ...state.listing,
              listerObj: { ...listerDoc },
            });
            setLoading(false);
          })
          .catch((err) =>
            setError({
              title: "Something went wrong.",
              message: "We couldn't find the lister...",
            })
          );
      }
    }
  }, []);
  const handleCreateListing = () => {
    console.log(uploadImages);
    if (validated()) {
      if (!createLoading) {
        setCreateLoading(true);
        // Upload listing to db
        Geocode.setApiKey("AIzaSyA9bRZxPfE3728Oi902FVJKzWgCOGyQL3U");
        Geocode.fromAddress(
          `${listing.address} ${listing.city}, ${listing.state} ${listing.zipCode}`
        )
          .then((res) => {
            const { lat, lng } = res.results[0].geometry.location;
            const geohash = ngeohash.encode(lat, lng);
            let tmpListing = {
              ...listing,
              lister: listing.listerObj.uid,
            };
            delete tmpListing.listerObj;
            const newListing = {
              ...tmpListing,
              after: true,
              environment: "production",
              fullAddress: `${listing.address.trim()}, ${listing.city.trim()} ${listing.state.trim()} ${listing.zipCode.trim()}`,
              _geoloc: {
                lat,
                lng,
              },
              geohash,
              lat,
              lng,
              created: listing.created
                ? new Date(listing.created.seconds * 1000)
                : new Date(),
            };
            if (listing && listing.docID !== undefined) {
              // We are updating
              if (uploadImages) {
                createListing(newListing, uploadImages, listing.docID)
                  .then((newDoc) => {
                    toast.success("Listing successfully updated!");
                    setListing();
                    setListerEmail();
                    setEmailSearchResults();
                    setCreateLoading(false);
                    setTmpImage();
                    setUploadImages();
                    console.log(JSON.stringify(newDoc, null, 3));
                  })
                  .catch((err) => {
                    setCreateLoading(false);
                    setError(err);
                  });
              } else {
                createListing(newListing, false, listing.docID)
                  .then((newDoc) => {
                    toast.success("Listing successfully updated!");
                    setListing();
                    setListerEmail();
                    setEmailSearchResults();
                    setCreateLoading(false);
                    setTmpImage();
                    setUploadImages();
                    console.log(JSON.stringify(newDoc, null, 3));
                  })
                  .catch((err) => {
                    setCreateLoading(false);
                    setError(err);
                  });
              }
            } else {
              // Creating for the first time
              if (uploadImages) {
                createListing(newListing, uploadImages)
                  .then((newDoc) => {
                    toast.success("Listing successfully uploaded!");
                    setListing();
                    setListerEmail();
                    setEmailSearchResults();
                    setCreateLoading(false);
                    setTmpImage();
                    setUploadImages();
                    console.log(JSON.stringify(newDoc, null, 3));
                  })
                  .catch((err) => {
                    setCreateLoading(false);
                    setError(err);
                  });
              } else {
                createListing(newListing)
                  .then((newDoc) => {
                    toast.success("Listing successfully uploaded!");
                    setListing();
                    setListerEmail();
                    setEmailSearchResults();
                    setCreateLoading(false);
                    setTmpImage();
                    setUploadImages();
                    console.log(JSON.stringify(newDoc, null, 3));
                  })
                  .catch((err) => {
                    setCreateLoading(false);
                    setError(err);
                  });
              }
            }
          })
          .catch((err) => {
            setCreateLoading(false);
            setError({
              title: "Something went wrong.",
              message: "Here's the error: " + JSON.stringify(err),
            });
          });
      } else {
        setCreateLoading(false);
        setError({
          title: "The listing is still being created",
          message:
            "Please wait, if it doees not upload for a bit, refresh the page.",
        });
      }
    }
  };
  const handleCreateUser = () => {
    if (!createUserLoading) {
      setCreateUserLoading(true);
      if (listing && listing.listerObj) {
        createUser(listing.listerObj)
          .then((result) => {
            toast.success("User Updated successfully.");
            setListing((prevState) => ({
              ...prevState,
              email: result.newUser.email,
              firstName: result.newUser.firstName,
              lastName: result.newUser.lastName,
              listerObj: result.newUser,
              ...(result.newUser.companyName
                ? { companyName: result.newUser.companyName }
                : {}),
              ...(result.newUser.phoneNumber
                ? { phoneNumber: result.newUser.phoneNumber }
                : {}),
            }));
            setCreateUserLoading(false);
            setShowCreateUserModal(false);
          })
          .catch((err) => {
            setError({
              title: "An error occurred",
              message: JSON.stringify(err),
            });
          });
      } else if (
        newUser &&
        newUser.email &&
        newUser.firstName &&
        newUser.lastName
      ) {
        createUser(newUser)
          .then((result) => {
            toast.success("User created successfully.");
            setListing((prevState) => ({
              ...prevState,
              email: result.newUser.email,
              firstName: result.newUser.firstName,
              lastName: result.newUser.lastName,
              listerObj: result.newUser,
              ...(result.newUser.companyName
                ? { companyName: result.newUser.companyName }
                : {}),
              ...(result.newUser.phoneNumber
                ? { phoneNumber: result.newUser.phoneNumber }
                : {}),
            }));
            setCreateUserLoading(false);
            setShowCreateUserModal(false);
          })
          .catch((err) => {
            setError({
              title: "An error occurred",
              message: JSON.stringify(err),
            });
          });
      } else {
        setCreateUserLoading(false);
        setError({
          title: "Invalid Input.",
          message: "Please fill all fields in correctly.",
        });
      }
    } else {
      setCreateUserLoading(false);
    }
  };
  const validated = () => {
    if (listing) {
      if (listing.listerObj === undefined) {
        setError({
          title: "Must include a lister.",
          message: "Start typing to find users, if none show up, create one.",
        });
        return false;
      } else if (listing.phoneNumber === undefined) {
        setFormErrors({
          phoneNumber: "Phone number required",
        });
        return false;
      } else if (listing.companyName === undefined) {
        setFormErrors({
          companyName: "Company Name required",
        });
        return false;
      } else if (listing.address === undefined) {
        setFormErrors({
          address: "Address required",
        });
        return false;
      } else if (listing.city === undefined) {
        setFormErrors({
          city: "City required",
        });
        return false;
      } else if (listing.state === undefined) {
        setFormErrors({
          state: "State required",
        });
        return false;
      } else if (listing.zipCode === undefined) {
        setFormErrors({
          zipCode: "Zip code required",
        });
        return false;
      } else if (listing.beds === undefined) {
        setFormErrors({
          beds: "Beds required",
        });
        return false;
      } else if (listing.baths === undefined) {
        setFormErrors({
          baths: "Baths required",
        });
        return false;
      } else if (listing.sqftHeated === undefined) {
        setFormErrors({
          sqftHeated: "Sqft Heated required",
        });
        return false;
      } else if (listing.purchasePrice === undefined) {
        setFormErrors({
          purchasePrice: "Price required, must be a number",
        });
        return false;
      } else if (listing.propertyType === undefined) {
        setFormErrors({
          propertyType: "Property type required",
        });
        return false;
      } else if (
        !uploadImages &&
        (listing.images === undefined || listing.images.length < 1)
      ) {
        setFormErrors({
          images: "At least one image required",
        });
      } else {
        setFormErrors({});
        return true;
      }
    } else {
      setError({
        title: "Form not filled out.",
        message: "Please fill out all of the required fields in the form",
      });
      return false;
    }
  };
  const theme = useTheme();
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
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              paddingTop: navbarHeight,
              position: "relative",
            }}
          >
            <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: "40%",
                }}
              >
                <div
                  className="p-3"
                  style={{
                    backgroundColor: "white",
                    overflow: "scroll",
                    flex: 1,
                  }}
                >
                  <div>
                    <div>
                      <Text color="primary.500" fontWeight={300} fontSize={20}>
                        Create Listing
                      </Text>
                      {listing &&
                      listing.listerObj &&
                      listing.email &&
                      listing.listerObj.uid ? (
                        <div className="py-3">
                          <div
                            className="py-2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text fontSize={18} color="secondary.800">
                              Lister:
                            </Text>
                            <Pressable
                              onPress={() => {
                                setListerPPUrl();
                                setListing((prevState) => {
                                  let tmpListing = prevState;
                                  delete tmpListing.listerObj;
                                  delete tmpListing.email;
                                  delete tmpListing.firstName;
                                  delete tmpListing.lastName;
                                  delete tmpListing.phoneNumber;
                                  delete tmpListing.companyName;
                                  return { ...tmpListing };
                                });
                              }}
                            >
                              <FaTrashAlt color={theme.colors.red["400"]} />
                            </Pressable>
                          </div>
                          <Box
                            bg="white"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: 8,
                              borderWidth: 1,
                              borderColor: theme.colors.primary["300"],
                              flex: 1,
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                            }}
                          >
                            <div className="d-flex flex-row justify-content-flex-start p-2 align-items-center">
                              <Image
                                key={listerPPUrl ? listerPPUrl : "wadzoo.com"}
                                height={35}
                                width={35}
                                borderRadius={30}
                                borderWidth={1}
                                borderColor="primary.500"
                                source={{
                                  uri: listerPPUrl ? listerPPUrl : "wadzoo.com",
                                }}
                                fallbackElement={
                                  <Box
                                    style={{
                                      width: 35,
                                      height: 35,
                                      borderRadius: 50,
                                      backgroundColor:
                                        theme.colors.muted["500"],
                                      borderWidth: 1,
                                      borderColor: theme.colors.primary["500"],
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FaUser
                                      color={theme.colors.lightText}
                                      size={10}
                                    />
                                  </Box>
                                }
                              />
                              <div
                                className="p-2"
                                style={{
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Avenir",
                                  fontSize: 14,
                                }}
                              >
                                <HStack
                                  justifyContent="space-between"
                                  alignItems="center"
                                  flex={1}
                                >
                                  <Text>{`${listing.listerObj.firstName} ${listing.listerObj.lastName}`}</Text>
                                </HStack>
                                {listing.email}
                              </div>
                              <Button
                                variant="subtle"
                                onPress={() => setShowCreateUserModal(true)}
                              >
                                Edit User
                              </Button>
                            </div>
                          </Box>
                          <Button
                            my={2}
                            variant="subtle"
                            onPress={() => setShowCompanyLogoModal(true)}
                          >
                            {`${
                              listerPPUrl === null ? "Set" : "Change"
                            } Company Logo`}
                          </Button>
                        </div>
                      ) : (
                        <div className="py-3">
                          <FormControl
                            isRequired
                            isInvalid={"lister" in formErrors}
                          >
                            <FormControl.Label>Lister:</FormControl.Label>
                            <Input
                              onChangeText={(text) => setListerEmail(text)}
                              value={listerEmail ? listerEmail : ""}
                              fontSize={16}
                              placeholder="Start typing email"
                              variant="outline"
                            />
                            {"lister" in formErrors ? (
                              <FormControl.ErrorMessage>
                                Lister required.
                              </FormControl.ErrorMessage>
                            ) : (
                              <FormControl.HelperText>
                                Start typing an email address. If no users show
                                up, create a user with their name and email
                                address.
                              </FormControl.HelperText>
                            )}
                          </FormControl>
                          {emailSearchLoading && (
                            <div
                              className="py-2"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Spinner color="primary.500" />
                            </div>
                          )}
                          {!emailSearchLoading &&
                            emailSearchResults &&
                            emailSearchResults.length === 0 && (
                              <div
                                className="py-2"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Text color="secondary.800">
                                  No users found
                                </Text>
                                <Pressable
                                  onPress={() => setShowCreateUserModal(true)}
                                >
                                  <Text fontSize={12} color="primary.500">
                                    Create a user
                                  </Text>
                                </Pressable>
                              </div>
                            )}
                          {emailSearchResults &&
                            emailSearchResults.slice(0, 5).map((user) => (
                              <Pressable
                                key={user.uid}
                                onPress={() => {
                                  setListerEmail();
                                  setEmailSearchResults();
                                  setListing((prevState) => ({
                                    ...prevState,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    listerObj: user,
                                    ...(user.companyName
                                      ? { companyName: user.companyName }
                                      : {}),
                                    ...(user.phoneNumber
                                      ? { phoneNumber: user.phoneNumber }
                                      : {}),
                                  }));
                                  toast.success("Lister updated!");
                                }}
                              >
                                {({ isPressed, isHovered }) => (
                                  <div
                                    className="p-3 my-1"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.${
                                        isHovered ? "19" : "09"
                                      })`,
                                      borderRadius: 8,
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <Text>{`${user.firstName} ${user.lastName}`}</Text>
                                    <Text fontWeight={100}>{user.email}</Text>
                                  </div>
                                )}
                              </Pressable>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="py-2">
                      {listing && listing.docID && (
                        <Button
                          variant="subtle"
                          onPress={() => setShowReorderModal(true)}
                          my={3}
                        >
                          Reorder Property Images
                        </Button>
                      )}
                      <Text
                        fontSize={18}
                        fontWeight={300}
                        color="secondary.800"
                      >
                        Extra Contact Info:
                      </Text>
                      <div
                        style={{
                          borderRadius: 8,
                          backgroundColor: "white",
                        }}
                      >
                        <FormControl
                          isRequired
                          isInvalid={"phoneNumber" in formErrors}
                          py={2}
                        >
                          <FormControl.Label>Phone Number</FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) => {
                              const regex = /^[0-9\b]+$/;
                              if (
                                (text === "" ||
                                  regex.test(text.replace(/-/g, ""))) &&
                                text.replace(/-/g, "").length <= 10
                              ) {
                                setListing((prevState) => ({
                                  ...prevState,
                                  phoneNumber: text.replace(/-/g, ""),
                                }));
                              }
                            }}
                            value={
                              listing && listing.phoneNumber
                                ? formatPhoneNumber(listing.phoneNumber)
                                : ""
                            }
                            placeholder="1234567890"
                            variant="outline"
                            size="lg"
                          />
                          {"phoneNumber" in formErrors ? (
                            <FormControl.ErrorMessage>
                              {formErrors.phoneNumber}
                            </FormControl.ErrorMessage>
                          ) : (
                            <FormControl.HelperText>
                              Must be 10 digits, only numbers.
                            </FormControl.HelperText>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={"companyName" in formErrors}
                          py={2}
                        >
                          <FormControl.Label>Company Name</FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                companyName: text,
                              }))
                            }
                            value={
                              listing && listing.companyName
                                ? listing.companyName
                                : ""
                            }
                            placeholder="Wadzoo Realty"
                            variant="outline"
                            size="lg"
                          />
                          {"companyName" in formErrors && (
                            <FormControl.ErrorMessage>
                              {formErrors.companyName}
                            </FormControl.ErrorMessage>
                          )}
                        </FormControl>
                      </div>
                    </div>
                    <div className="py-2">
                      <Text
                        fontSize={18}
                        fontWeight={300}
                        color="secondary.800"
                      >
                        Property Info:
                      </Text>
                      <FormControl
                        isRequired
                        isInvalid={"address" in formErrors}
                        py={2}
                      >
                        <FormControl.Label>Address</FormControl.Label>
                        <Input
                          _invalid={{ borderColor: "red.500" }}
                          onChangeText={(text) =>
                            setListing((prevState) => ({
                              ...prevState,
                              address: text,
                            }))
                          }
                          value={
                            listing && listing.address ? listing.address : ""
                          }
                          placeholder="1212 SE 134th Street"
                          variant="outline"
                          size="sm"
                        />
                        {"address" in formErrors ? (
                          <FormControl.ErrorMessage>
                            {formErrors.address}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText>
                            Only the street address, not the city/state.
                          </FormControl.HelperText>
                        )}
                      </FormControl>
                      <FormControl
                        isRequired
                        isInvalid={"city" in formErrors}
                        py={2}
                      >
                        <FormControl.Label>City</FormControl.Label>
                        <Input
                          _invalid={{ borderColor: "red.500" }}
                          onChangeText={(text) =>
                            setListing((prevState) => ({
                              ...prevState,
                              city: text,
                            }))
                          }
                          value={listing && listing.city ? listing.city : ""}
                          placeholder="Ocala"
                          variant="outline"
                          size="sm"
                        />
                        {"city" in formErrors && (
                          <FormControl.ErrorMessage>
                            {formErrors.city}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                      <Row>
                        <Col>
                          <FormControl
                            isRequired
                            isInvalid={"state" in formErrors}
                            py={2}
                          >
                            <FormControl.Label>State</FormControl.Label>
                            <Input
                              _invalid={{ borderColor: "red.500" }}
                              onChangeText={(text) =>
                                setListing((prevState) => ({
                                  ...prevState,
                                  state: text,
                                }))
                              }
                              value={
                                listing && listing.state ? listing.state : ""
                              }
                              placeholder="Florida"
                              variant="outline"
                              size="sm"
                            />
                            {"state" in formErrors && (
                              <FormControl.ErrorMessage>
                                {formErrors.state}
                              </FormControl.ErrorMessage>
                            )}
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            isRequired
                            isInvalid={"zipCode" in formErrors}
                            py={2}
                          >
                            <FormControl.Label>Zip Code</FormControl.Label>
                            <Input
                              _invalid={{ borderColor: "red.500" }}
                              onChangeText={(text) =>
                                setListing((prevState) => ({
                                  ...prevState,
                                  zipCode: text,
                                }))
                              }
                              value={
                                listing && listing.zipCode
                                  ? listing.zipCode
                                  : ""
                              }
                              placeholder="34480"
                              variant="outline"
                              size="sm"
                            />
                            {"zipCode" in formErrors && (
                              <FormControl.ErrorMessage>
                                {formErrors.zipCode}
                              </FormControl.ErrorMessage>
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormControl
                            isRequired
                            isInvalid={"beds" in formErrors}
                            py={2}
                          >
                            <FormControl.Label>Beds</FormControl.Label>
                            <Input
                              _invalid={{ borderColor: "red.500" }}
                              onChangeText={(text) =>
                                setListing((prevState) => ({
                                  ...prevState,
                                  beds: text,
                                }))
                              }
                              value={
                                listing && listing.beds ? listing.beds : ""
                              }
                              placeholder="3"
                              variant="outline"
                              size="sm"
                            />
                            {"beds" in formErrors ? (
                              <FormControl.ErrorMessage>
                                {formErrors.beds}
                              </FormControl.ErrorMessage>
                            ) : (
                              <FormControl.HelperText>
                                Only numbers
                              </FormControl.HelperText>
                            )}
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            isRequired
                            isInvalid={"baths" in formErrors}
                            py={2}
                          >
                            <FormControl.Label>Baths</FormControl.Label>
                            <Input
                              _invalid={{ borderColor: "red.500" }}
                              onChangeText={(text) =>
                                setListing((prevState) => ({
                                  ...prevState,
                                  baths: text,
                                }))
                              }
                              value={
                                listing && listing.baths ? listing.baths : ""
                              }
                              placeholder="2"
                              variant="outline"
                              size="sm"
                            />
                            {"baths" in formErrors && (
                              <FormControl.ErrorMessage>
                                {formErrors.baths}
                              </FormControl.ErrorMessage>
                            )}
                          </FormControl>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormControl py={2}>
                            <FormControl.Label>Acres</FormControl.Label>
                            <Input
                              onChangeText={(text) =>
                                setListing((prevState) => ({
                                  ...prevState,
                                  acres: text,
                                }))
                              }
                              value={
                                listing && listing.acres ? listing.acres : ""
                              }
                              placeholder="20.1"
                              variant="outline"
                              size="sm"
                            />
                            <FormControl.HelperText>
                              Decimals Allowed
                            </FormControl.HelperText>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl
                            isRequired
                            isInvalid={"sqftHeated" in formErrors}
                            py={2}
                          >
                            <FormControl.Label>Sqft Heated</FormControl.Label>
                            <Input
                              _invalid={{ borderColor: "red.500" }}
                              onChangeText={(text) =>
                                setListing((prevState) => ({
                                  ...prevState,
                                  sqftHeated: text,
                                }))
                              }
                              value={
                                listing && listing.sqftHeated
                                  ? listing.sqftHeated
                                  : ""
                              }
                              placeholder="123"
                              variant="outline"
                              size="sm"
                            />
                            {"sqftHeated" in formErrors ? (
                              <FormControl.ErrorMessage>
                                {formErrors.sqftHeated}
                              </FormControl.ErrorMessage>
                            ) : (
                              <FormControl.HelperText>
                                Only Numbers
                              </FormControl.HelperText>
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                      <FormControl
                        isRequired
                        isInvalid={"purchasePrice" in formErrors}
                        py={2}
                      >
                        <FormControl.Label>Purchase Price</FormControl.Label>
                        <Input
                          _invalid={{ borderColor: "red.500" }}
                          onChangeText={(text) =>
                            setListing((prevState) => ({
                              ...prevState,
                              purchasePrice: text,
                            }))
                          }
                          value={
                            listing && listing.purchasePrice
                              ? listing.purchasePrice
                              : ""
                          }
                          placeholder="340000"
                          variant="outline"
                          size="sm"
                        />
                        {"purchasePrice" in formErrors ? (
                          <FormControl.ErrorMessage>
                            {formErrors.purchasePrice}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText>
                            Only numbers, no commas or dollar signs
                          </FormControl.HelperText>
                        )}
                      </FormControl>
                      <FormControl
                        isRequired
                        isInvalid={"propertyType" in formErrors}
                        py={2}
                      >
                        <FormControl.Label>Property Type</FormControl.Label>
                        <Select
                          onValueChange={(val) => {
                            setListing((prevState) => ({
                              ...prevState,
                              propertyType: val,
                            }));
                          }}
                          placeholder="Choose Type"
                        >
                          {propertyTypeVals.map((type) => (
                            <Select.Item label={type} value={type} key={type} />
                          ))}
                        </Select>
                        {"propertyType" in formErrors ? (
                          <FormControl.ErrorMessage>
                            {formErrors.propertyType}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText>
                            If you don't see the exact type, pick the closest
                            one.
                          </FormControl.HelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className="py-2 d-flex flex-column">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <Text
                          fontSize={18}
                          fontWeight={300}
                          color="secondary.800"
                        >
                          Property Images:
                        </Text>
                        <Text
                          fontSize={16}
                          fontWeight={300}
                          color={
                            listing &&
                            listing.images &&
                            listing.images.length >= 1
                              ? "primary.500"
                              : uploadImages && uploadImages.length >= 1
                              ? "primary.500"
                              : "red.500"
                          }
                        >
                          {uploadImages
                            ? uploadImages.length
                            : listing && listing.images
                            ? `${listing.images.length}`
                            : "None"}
                        </Text>
                      </div>
                      <Text fontSize={12} color="muted.400">
                        At least one image required, the more the better!
                      </Text>
                      <Button
                        my={3}
                        onPress={() => setShowImagesModal(true)}
                        variant="subtle"
                      >
                        {`${
                          listing && listing.docID !== undefined
                            ? "Change"
                            : "Add"
                        } Property Images`}
                      </Button>
                      <div className="py-2">
                        <Text
                          fontSize={18}
                          fontWeight={300}
                          color="secondary.800"
                        >
                          Extra Property Info:
                        </Text>
                        <FormControl py={2}>
                          <FormControl.Label>
                            After Repair Value (arv)
                          </FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                arv: text,
                              }))
                            }
                            value={listing && listing.arv ? listing.arv : ""}
                            placeholder="340000"
                            variant="outline"
                            size="sm"
                          />
                          <FormControl.HelperText>
                            Only numbers, no commas or dollar signs
                          </FormControl.HelperText>
                        </FormControl>
                        <Row>
                          <Col>
                            <FormControl py={2}>
                              <FormControl.Label>Year Built</FormControl.Label>
                              <Input
                                _invalid={{ borderColor: "red.500" }}
                                onChangeText={(text) =>
                                  setListing((prevState) => ({
                                    ...prevState,
                                    yearBuilt: text,
                                  }))
                                }
                                value={
                                  listing && listing.yearBuilt
                                    ? listing.yearBuilt
                                    : ""
                                }
                                placeholder="1964"
                                variant="outline"
                                size="sm"
                              />
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl py={2}>
                              <FormControl.Label>Occupancy</FormControl.Label>
                              <Input
                                _invalid={{ borderColor: "red.500" }}
                                onChangeText={(text) =>
                                  setListing((prevState) => ({
                                    ...prevState,
                                    occupancyStatus: text,
                                  }))
                                }
                                value={
                                  listing && listing.occupancyStatus
                                    ? listing.occupancyStatus
                                    : ""
                                }
                                placeholder="Occupancy Status"
                                variant="outline"
                                size="sm"
                              />
                            </FormControl>
                          </Col>
                        </Row>

                        <FormControl py={2}>
                          <FormControl.Label>
                            Net Operating Income (noi)
                          </FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                noi: text,
                              }))
                            }
                            value={listing && listing.noi ? listing.noi : ""}
                            placeholder="340000"
                            variant="outline"
                            size="sm"
                          />
                          <FormControl.HelperText>
                            Only numbers, no commas or dollar signs
                          </FormControl.HelperText>
                        </FormControl>
                        <FormControl py={2}>
                          <FormControl.Label>Buyer's Fee</FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                buyersFee: text,
                              }))
                            }
                            value={
                              listing && listing.buyersFee
                                ? listing.buyersFee
                                : ""
                            }
                            placeholder="340000"
                            variant="outline"
                            size="sm"
                          />
                          <FormControl.HelperText>
                            You can input a percentage here, just add '%'
                          </FormControl.HelperText>
                        </FormControl>
                        <FormControl py={2}>
                          <FormControl.Label>Repair Cost</FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                repairCost: text,
                              }))
                            }
                            value={
                              listing && listing.repairCost
                                ? listing.repairCost
                                : ""
                            }
                            placeholder="340000"
                            variant="outline"
                            size="sm"
                          />
                          <FormControl.HelperText>
                            Only numbers, no commas or dollar signs
                          </FormControl.HelperText>
                        </FormControl>
                        <FormControl py={2}>
                          <FormControl.Label>Rent</FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                rent: text,
                              }))
                            }
                            value={listing && listing.rent ? listing.rent : ""}
                            placeholder="340000"
                            variant="outline"
                            size="sm"
                          />
                          <FormControl.HelperText>
                            Only numbers, no commas or dollar signs
                          </FormControl.HelperText>
                        </FormControl>
                        <FormControl py={2}>
                          <FormControl.Label>
                            Capitalization Rate
                          </FormControl.Label>
                          <Input
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                cap: text,
                              }))
                            }
                            value={listing && listing.cap ? listing.cap : ""}
                            placeholder="0.34"
                            variant="outline"
                            size="sm"
                          />
                          <FormControl.HelperText>
                            Decimals allowed
                          </FormControl.HelperText>
                        </FormControl>
                        <FormControl py={2}>
                          <FormControl.Label>Comments</FormControl.Label>
                          <TextArea
                            _invalid={{ borderColor: "red.500" }}
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                comments: text,
                              }))
                            }
                            value={
                              listing && listing.comments
                                ? listing.comments
                                : ""
                            }
                            placeholder="Any other comments that buyer's might want to know."
                            variant="outline"
                            size="sm"
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className="p-3 pt-4">
                      <Button isDisabled={true} />
                    </div>
                  </div>
                </div>
                <div
                  className="p-3"
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                  }}
                >
                  <Button onPress={handleCreateListing}>
                    {createLoading ? (
                      <Spinner color="white" />
                    ) : (
                      <Text button>
                        {listing && listing.docID !== undefined
                          ? "Update"
                          : "Create"}
                      </Text>
                    )}
                  </Button>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#EDf0F3",
                  overflow: "scroll",
                }}
              >
                <div
                  className="p-3 m-3"
                  style={{
                    flexDirection: "column",
                    borderRadius: 8,
                    backgroundColor: "white",
                    display: "flex",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                    flex: 1,
                    overflow: "scroll",
                  }}
                >
                  <Text fontSize={20} fontWeight={300} color="secondary.800">
                    Live Preview
                  </Text>
                  <Text fontSize={14} color="muted.400">
                    The preview will update as you fill in the form.
                  </Text>
                  <div
                    className="iphone-x flex-column justify-content-flex-start align-items-center"
                    style={{
                      overflow: "scroll",
                      backgroundColor: theme.colors.dark["100"],
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: theme.colors.dark["50"],
                        display: "flex",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          height: 200,
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <Image
                          key={
                            tmpImage
                              ? tmpImage
                              : listing && listing.images && listing.images[0]
                              ? listing.images[0]
                              : "wadzoo.com"
                          }
                          source={{
                            uri: tmpImage
                              ? tmpImage
                              : listing && listing.images && listing.images[0]
                              ? listing.images[0]
                              : "wadzoo.com",
                          }}
                          alt="Listing Image"
                          resizeMode="cover"
                          h="100%"
                          fallbackElement={
                            <Box
                              style={{ flex: 1 }}
                              height="100%"
                              justifyContent="center"
                              alignItems="center"
                              _dark={{ bg: "dark.300" }}
                            >
                              <VStack
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                w="70%"
                                space={3}
                              >
                                <FaExclamationTriangle
                                  size={20}
                                  color={theme.colors.lightText}
                                />
                                <Text
                                  fontWeight={200}
                                  fontSize={12}
                                  textAlign="center"
                                  color="lightText"
                                >
                                  You haven't added any images yet.
                                </Text>
                              </VStack>
                            </Box>
                          }
                          w="100%"
                        />
                        <div
                          className="py-2 px-1"
                          style={{
                            background:
                              "linear-gradient(0deg, #000000, transparent)",
                            position: "absolute",
                            width: "100%",
                            bottom: 0,
                          }}
                        >
                          {listing && listing.purchasePrice ? (
                            <Text
                              fontWeight={300}
                              fontSize={18}
                              color="lightText"
                            >{`$${Number(
                              listing.purchasePrice
                            ).toLocaleString()}`}</Text>
                          ) : (
                            <Text fontSize={18} color="lightText">
                              Price Not Set
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                    <VStack
                      style={{ flex: 1, flexShrink: 1, borderRadius: 5 }}
                      m={1}
                      p={3}
                      shadow={2}
                      rounded={3}
                      bg="dark.50"
                      space={3}
                    >
                      <Text color="primary.500" fontWeight={300}>
                        Address
                      </Text>
                      {listing && listing.address ? (
                        <Text fontWeight={300} fontSize={20} color="lightText">
                          {listing && listing.address
                            ? listing.address
                            : "Address Not Set"}
                          {", "}
                          {listing && listing.city
                            ? listing.city
                            : "City"},{" "}
                          {listing && listing.state ? listing.state : "State"}
                        </Text>
                      ) : (
                        <>
                          <Skeleton.Text p={5} />
                          <Skeleton.Text p={5} />
                        </>
                      )}
                    </VStack>
                    <VStack
                      m={1}
                      p={3}
                      shadow={2}
                      rounded={3}
                      bg="dark.50"
                      space={2}
                    >
                      <HStack
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        space={2}
                      >
                        <FaBed
                          name="bed"
                          size={16}
                          color={theme.colors.lightText}
                        />
                        <Text color="lightText" fontWeight={300} fontSize={16}>
                          {listing && listing.beds ? listing.beds : "X"}
                        </Text>
                        <Text color="lightText" fontWeight={300} fontSize={16}>
                          Beds
                        </Text>
                        <Divider orientation="vertical" />
                        <FaBath
                          name="bath"
                          size={16}
                          color={theme.colors.lightText}
                        />
                        <Text color="lightText" fontWeight={300} fontSize={16}>
                          {listing && listing.baths ? listing.baths : "X"}
                        </Text>
                        <Text color="lightText" fontWeight={300} fontSize={16}>
                          Baths
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        space={2}
                      >
                        <FaRulerCombined
                          size={16}
                          color={theme.colors.lightText}
                        />
                        <Text color="lightText" fontWeight={300} fontSize={16}>
                          {listing && listing.sqftHeated
                            ? Number(listing.sqftHeated).toLocaleString()
                            : "X"}
                        </Text>
                        <Text color="lightText" fontWeight={300} fontSize={16}>
                          Heated Sqft
                        </Text>
                      </HStack>
                    </VStack>
                    <VStack
                      m={1}
                      p={3}
                      shadow={2}
                      rounded={3}
                      bg="dark.50"
                      space={3}
                    >
                      <HStack
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            fontWeight={300}
                          >
                            Property Type
                          </Text>
                          {listing && listing.propertyType ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              fontWeight={100}
                            >
                              {listing.propertyType}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            textAlign="right"
                            fontWeight={300}
                          >
                            Lot
                          </Text>
                          {listing && listing.acres ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              textAlign="right"
                              fontWeight={100}
                            >
                              {listing.acres} ac
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                      </HStack>
                      <HStack
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            fontWeight={300}
                          >
                            Year Built
                          </Text>
                          {listing && listing.yearBuilt ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              fontWeight={100}
                            >
                              {listing.yearBuilt}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            textAlign="right"
                            fontWeight={300}
                          >
                            After Repair Value
                          </Text>
                          {listing && listing.arv ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              textAlign="right"
                              fontWeight={100}
                            >
                              ${Number(listing.arv).toLocaleString()}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                      </HStack>
                      <HStack
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            fontWeight={300}
                          >
                            Occupancy Status
                          </Text>
                          {listing && listing.occupancyStatus ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              fontWeight={100}
                            >
                              {listing.occupancyStatus}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            textAlign="right"
                            fontWeight={300}
                          >
                            Repair Cost
                          </Text>
                          {listing && listing.repairCost ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              textAlign="right"
                              fontWeight={100}
                            >
                              ${Number(listing.repairCost).toLocaleString()}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                      </HStack>
                      <HStack
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            fontWeight={300}
                          >
                            Buyer's Fee
                          </Text>
                          {listing && listing.buyersFee ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              fontWeight={100}
                            >
                              {listing.buyersFee}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            textAlign="right"
                            fontWeight={300}
                          >
                            Collected Rent
                          </Text>
                          {listing && listing.rent ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              textAlign="right"
                              fontWeight={100}
                            >
                              ${Number(listing.rent).toLocaleString()}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                      </HStack>
                      <HStack
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            fontWeight={300}
                          >
                            Net Operating Income
                          </Text>
                          {listing && listing.noi ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              fontWeight={100}
                            >
                              ${Number(listing.noi).toLocaleString()}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                        <VStack>
                          <Text
                            fontSize={10}
                            color="lightText"
                            textAlign="right"
                            fontWeight={300}
                          >
                            Capitalization Rate
                          </Text>
                          {listing && listing.cap ? (
                            <Text
                              fontSize={10}
                              color="lightText"
                              textAlign="right"
                              fontWeight={100}
                            >
                              {listing.cap}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </VStack>
                      </HStack>
                    </VStack>
                    <VStack m={1} p={3} shadow={2} rounded={3} bg="dark.50">
                      <Text color="primary.500" fontWeight={300}>
                        Contact
                      </Text>
                      <HStack p={3} space={3}>
                        <Image
                          key={listerPPUrl ? listerPPUrl : "wadzoo.com"}
                          height={30}
                          width={30}
                          borderRadius={30}
                          borderWidth={1}
                          borderColor="primary.500"
                          source={{
                            uri: listerPPUrl ? listerPPUrl : "wadzoo.com",
                          }}
                          fallbackElement={
                            <Box
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 50,
                                backgroundColor: theme.colors.muted["500"],
                                borderWidth: 1,
                                borderColor: theme.colors.primary["500"],
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <FaUser
                                color={theme.colors.lightText}
                                size={10}
                              />
                            </Box>
                          }
                        />

                        <div className="d-flex flex-column align-content-center justify-content-center flex-grow-1">
                          {listing && listing.listerObj ? (
                            <Text fontSize={12} color="lightText">
                              {listing.listerObj.firstName}{" "}
                              {listing.listerObj.lastName}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                          {listing && listing.companyName ? (
                            <Text fontSize={10} color="lightText">
                              {listing.companyName}
                            </Text>
                          ) : (
                            <Skeleton.Text p={3} />
                          )}
                        </div>
                      </HStack>
                    </VStack>
                  </div>
                  <div
                    className="py-3"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="d-flex flex-column">
                      <Text
                        fontSize={20}
                        fontWeight={300}
                        color="secondary.800"
                      >
                        Raw Data
                      </Text>
                      <Text fontSize={14} color="muted.400">
                        Here you can see the data as text as it is filled in.
                      </Text>
                    </div>
                    <Button
                      variant="subtle"
                      onPress={() => setShowData(!showData)}
                    >
                      {showData ? "Hide Data" : "Show Data"}
                    </Button>
                  </div>
                  <PresenceTransition
                    visible={showData}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 500 } }}
                  >
                    <Text>
                      {listing
                        ? JSON.stringify(
                            listing,
                            [
                              "phoneNumber",
                              "companyName",
                              "address",
                              "city",
                              "state",
                              "zipCode",
                              "beds",
                              "baths",
                              "propertyType",
                              "acres",
                              "yearBuilt",
                              "arv",
                              "occupancyStatus",
                              "repairCost",
                              "cap",
                              "rent",
                              "buyersFee",
                              "noi",
                              "images",
                              "purchasePrice",
                              "sqftHeated",
                              "email",
                              "comments",
                              "firstName",
                              "lastName",
                              "docID",
                              "listerObj",
                            ],
                            3
                          )
                        : "No Data to show yet"}
                    </Text>
                  </PresenceTransition>
                </div>
              </div>
            </div>
            {loading && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: theme.colors.light["50"] + "C0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ backgroundColor: "white", borderRadius: 8 }}
                  className="flex-column d-flex justify-content-center align-items-center p-4"
                >
                  <Spinner size="lg" color="primary.500" />
                  <Text fontWeight={300} pt={4} color="secondary.800">
                    Loading...
                  </Text>
                </div>
              </div>
            )}
            <Modal
              isOpen={showReorderModal}
              onClose={() => setShowReorderModal(false)}
              _backdrop={{ bg: "warmGray.500" }}
              size="full"
            >
              <ReorderPropertyImages
                listing={listing}
                setShowImagesModal={setShowReorderModal}
                images={
                  uploadImages
                    ? uploadImages
                    : listing && listing.images
                    ? listing.images
                    : null
                }
                setTmpImage={setTmpImage}
                setListing={setListing}
                setUploadImages={setUploadImages}
              />
            </Modal>
            <Modal
              isOpen={showImagesModal}
              onClose={() => setShowImagesModal(false)}
              _backdrop={{ bg: "warmGray.500" }}
              size="xl"
            >
              <AddPropertyImages
                setShowImagesModal={setShowImagesModal}
                setTmpImage={setTmpImage}
                setListing={setListing}
                setUploadImages={setUploadImages}
              />
            </Modal>
            <Modal
              isOpen={showCompanyLogoModal}
              onClose={() => setShowCompanyLogoModal(false)}
              _backdrop={{ bg: "warmGray.500" }}
              size="xl"
            >
              {listing && listing.listerObj && listing.listerObj.uid ? (
                <AddCompanyLogo
                  header="Add Company Logo"
                  uid={listing.listerObj.uid}
                  setListerPPUrl={setListerPPUrl}
                  setShowCompanyLogoModal={setShowCompanyLogoModal}
                />
              ) : (
                <Text>There is no lister... Refresh and try again</Text>
              )}
            </Modal>
            <Modal
              isOpen={showCreateUserModal}
              onClose={() => setShowCreateUserModal(false)}
              _backdrop={{ bg: "warmGray.500" }}
              size="xl"
            >
              <Modal.Content
                shadow={0}
                style={{
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                }}
                bg="white"
                maxW={400}
              >
                <Modal.CloseButton colorScheme="red" />
                <Modal.Header borderBottomWidth={0}>
                  <Text fontSize={20}>
                    {listing && listing.listerObj
                      ? "Update User"
                      : "Create User"}
                  </Text>
                </Modal.Header>
                <Modal.Body bg="white" p={8}>
                  <Text>Name</Text>
                  <Row
                    className="pb-4"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Col xs={12} md={6}>
                      <Input
                        value={
                          listing && listing.listerObj
                            ? listing.listerObj.firstName
                            : newUser && newUser.firstName
                            ? newUser.firstName
                            : ""
                        }
                        onChangeText={(text) => {
                          if (listing && listing.listerObj) {
                            setListing((prevState) => ({
                              ...prevState,
                              listerObj: {
                                ...prevState.listerObj,
                                firstName: text,
                              },
                            }));
                          } else {
                            setNewUser((prevState) => ({
                              ...prevState,
                              firstName: text,
                            }));
                          }
                        }}
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="First Name"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Input
                        value={
                          listing && listing.listerObj
                            ? listing.listerObj.lastName
                            : newUser && newUser.lastName
                            ? newUser.lastName
                            : ""
                        }
                        onChangeText={(text) => {
                          if (listing && listing.listerObj) {
                            setListing((prevState) => ({
                              ...prevState,
                              listerObj: {
                                ...prevState.listerObj,
                                lastName: text,
                              },
                            }));
                          } else {
                            setNewUser((prevState) => ({
                              ...prevState,
                              lastName: text,
                            }));
                          }
                        }}
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="Last Name"
                      />
                    </Col>
                  </Row>
                  <Text>Email</Text>
                  <Row
                    className="mb-4"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Col>
                      <Input
                        value={
                          listing && listing.listerObj
                            ? listing.listerObj.email
                            : newUser && newUser.email
                            ? newUser.email
                            : ""
                        }
                        onChangeText={(text) => {
                          if (listing && listing.listerObj) {
                            setListing((prevState) => ({
                              ...prevState,
                              listerObj: {
                                ...prevState.listerObj,
                                email: text,
                              },
                              email: text,
                            }));
                          } else {
                            setNewUser((prevState) => ({
                              ...prevState,
                              email: text,
                            }));
                          }
                        }}
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="Email Address"
                      />
                    </Col>
                  </Row>
                  <Text>Phone Number</Text>
                  <Row
                    className="mb-3"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Col>
                      <Input
                        value={
                          listing && listing.listerObj
                            ? listing.listerObj.phoneNumber
                            : newUser && newUser.phoneNumber
                            ? newUser.phoneNumber
                            : ""
                        }
                        onChangeText={(text) => {
                          if (listing && listing.listerObj) {
                            setListing((prevState) => ({
                              ...prevState,
                              listerObj: {
                                ...prevState.listerObj,
                                phoneNumber: text,
                              },
                              phoneNumber: text,
                            }));
                          } else {
                            setNewUser((prevState) => ({
                              ...prevState,
                              phoneNumber: text,
                            }));
                          }
                        }}
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="Only numbers, no dashes (ex. 1234567890)"
                      />
                    </Col>
                  </Row>
                  <Text>Company Name</Text>
                  <Row
                    className="mb-3"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Col>
                      <Input
                        value={
                          listing && listing.listerObj
                            ? listing.listerObj.companyName
                            : newUser && newUser.companyName
                            ? newUser.companyName
                            : ""
                        }
                        onChangeText={(text) => {
                          if (listing && listing.listerObj) {
                            setListing((prevState) => ({
                              ...prevState,
                              listerObj: {
                                ...prevState.listerObj,
                                companyName: text,
                              },
                              companyName: text,
                            }));
                          } else {
                            setNewUser((prevState) => ({
                              ...prevState,
                              companyName: text,
                            }));
                          }
                        }}
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="Company Name"
                      />
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer py={0} bg="white">
                  <Button.Group space={2}>
                    <Button
                      my={3}
                      variant="ghost"
                      colorScheme="red"
                      onPress={() => setShowCreateUserModal(false)}
                    >
                      <Text>Cancel</Text>
                    </Button>
                    <Button onPress={handleCreateUser}>
                      {createUserLoading ? (
                        <Spinner color="white" />
                      ) : (
                        <Text>
                          {listing && listing.listerObj ? "Update" : "Create"}
                        </Text>
                      )}
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
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

export default CreateListing;
