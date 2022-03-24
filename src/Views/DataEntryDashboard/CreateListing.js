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
} from "../../FirebaseInterface";
import {
  FaBath,
  FaBed,
  FaCheck,
  FaExclamationTriangle,
  FaRulerCombined,
  FaTimes,
  FaTrashAlt,
} from "react-icons/all";
import { toast } from "react-toastify";
import "./CreateListing.css";
import { FaUser } from "react-icons/fa";
import Geocode from "react-geocode";
import ngeohash from "ngeohash";

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
  const [listing, setListing] = useState();
  const [emailSearchResults, setEmailSearchResults] = useState();
  const [emailSearchLoading, setEmailSearchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showData, setShowData] = useState(false);

  // Create New User State
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [newUser, setNewUser] = useState();

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
  const handleCreateListing = () => {
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
              geohash,
              lat,
              lng,
              created: new Date(),
            };
            createListing(newListing)
              .then((newDoc) => {
                toast.success("Listing successfully uploading!");
                setListing();
                setListerEmail();
                setEmailSearchResults();
                setCreateLoading(false);
                console.log(JSON.stringify(newDoc, null, 3));
              })
              .catch((err) => {
                setCreateLoading(false);
                setError(err);
              });
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
      if (newUser && newUser.email && newUser.firstName && newUser.lastName) {
        createUser(newUser)
          .then((result) => {
            toast.success("User created successfully.");
            setListing((prevState) => ({
              ...prevState,
              email: result.newUser.email,
              firstName: result.newUser.firstName,
              lastName: result.newUser.lastName,
              listerObj: result.newUser,
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
      } else if (listing.acres === undefined) {
        setFormErrors({
          acres: "Acres required",
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
      } else if (listing.images === undefined || listing.images.length < 1) {
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
  if (user) {
    if ((user.role && user.role === "dataEntry") || user.role === "admin") {
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
            }}
          >
            <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  width: 300,
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
                      {listing && listing.listerObj && listing.email ? (
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
                                setListing((prevState) => {
                                  let tmpListing = prevState;
                                  delete tmpListing.listerObj;
                                  delete tmpListing.email;
                                  delete tmpListing.firstName;
                                  delete tmpListing.lastName;
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
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                            }}
                          >
                            <div
                              className="p-2"
                              style={{
                                flexDirection: "column",
                                display: "flex",
                              }}
                            >
                              <HStack
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Text>{`${listing.listerObj.firstName} ${listing.listerObj.lastName}`}</Text>
                                <FaCheck color={theme.colors.primary["500"]} />
                              </HStack>
                              <Text fontWeight={100}>{listing.email}</Text>
                            </div>
                          </Box>
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
                          <FormControl
                            isRequired
                            isInvalid={"acres" in formErrors}
                            py={2}
                          >
                            <FormControl.Label>Acres</FormControl.Label>
                            <Input
                              _invalid={{ borderColor: "red.500" }}
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
                            {"acres" in formErrors ? (
                              <FormControl.ErrorMessage>
                                {formErrors.acres}
                              </FormControl.ErrorMessage>
                            ) : (
                              <FormControl.HelperText>
                                Decimals Allowed
                              </FormControl.HelperText>
                            )}
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
                    <div className="py-2">
                      <Text
                        fontSize={18}
                        fontWeight={300}
                        color="secondary.800"
                      >
                        Property Images:
                      </Text>
                      <FormControl
                        isRequired
                        isInvalid={"images" in formErrors}
                        py={2}
                      >
                        <FormControl.Label>Images</FormControl.Label>
                        <Input
                          _invalid={{ borderColor: "red.500" }}
                          onChangeText={(text) =>
                            setListing((prevState) => ({
                              ...prevState,
                              images: [
                                text,
                                ...(prevState &&
                                prevState.images &&
                                prevState.images.slice(1)
                                  ? prevState.images.slice(1)
                                  : []),
                              ],
                            }))
                          }
                          value={
                            listing &&
                            listing.images &&
                            listing.images.length !== 0
                              ? listing.images[0]
                              : ""
                          }
                          placeholder="URL"
                          variant="outline"
                          size="sm"
                        />
                        {listing &&
                          listing.images &&
                          listing.images.length > 1 &&
                          listing.images.slice(1).map((imageURL, idx) => (
                            <div
                              className="py-2"
                              key={idx}
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Input
                                _invalid={{ borderColor: "red.500" }}
                                onChangeText={(text) =>
                                  setListing((prevState) => ({
                                    ...prevState,
                                    images: [
                                      ...prevState.images.slice(0, idx + 1),
                                      text,
                                      ...prevState.images.slice(idx + 2),
                                    ],
                                  }))
                                }
                                value={listing.images[idx + 1]}
                                placeholder="URL"
                                variant="outline"
                                size="sm"
                              />
                              <Pressable
                                p={2}
                                onPress={() => {
                                  setListing((prevState) => ({
                                    ...prevState,
                                    images: [
                                      ...prevState.images.slice(0, idx + 1),
                                      ...prevState.images.slice(idx + 2),
                                    ],
                                  }));
                                }}
                              >
                                <FaTimes color={theme.colors.red["500"]} />
                              </Pressable>
                            </div>
                          ))}
                        <Button
                          my={3}
                          variant="subtle"
                          onPress={() => {
                            if (
                              listing &&
                              listing.images &&
                              listing.images[0]
                            ) {
                              setListing((prevState) => ({
                                ...prevState,
                                images: [...prevState.images, ""],
                              }));
                            } else {
                              setError({
                                title: "Add a URL first.",
                                message:
                                  "Add the first URL first, then you can add additional URLs",
                              });
                            }
                          }}
                        >
                          Add Another URL
                        </Button>
                        {"images" in formErrors ? (
                          <FormControl.ErrorMessage>
                            {formErrors.images}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText>
                            At least one image is required, the more the better!
                          </FormControl.HelperText>
                        )}
                      </FormControl>
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
                            Only numbers, no commas or dollar signs
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
                      <Text button>Create</Text>
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
                            listing && listing.images && listing.images[0]
                              ? listing.images[0]
                              : "wadzoo.com"
                          }
                          source={{
                            uri:
                              listing && listing.images && listing.images[0]
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
                              ${Number(listing.buyersFee).toLocaleString()}
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
                          <FaUser color={theme.colors.lightText} size={10} />
                        </Box>
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
                            ],
                            3
                          )
                        : "No Data to show yet"}
                    </Text>
                  </PresenceTransition>
                </div>
              </div>
            </div>
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
                  <Text fontSize={20}>Create User</Text>
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
                          newUser && newUser.firstName ? newUser.firstName : ""
                        }
                        onChangeText={(text) =>
                          setNewUser((prevState) => ({
                            ...prevState,
                            firstName: text,
                          }))
                        }
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="First Name"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Input
                        value={
                          newUser && newUser.lastName ? newUser.lastName : ""
                        }
                        onChangeText={(text) =>
                          setNewUser((prevState) => ({
                            ...prevState,
                            lastName: text,
                          }))
                        }
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="Last Name"
                      />
                    </Col>
                  </Row>
                  <Text>Email</Text>
                  <Row
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Col>
                      <Input
                        value={newUser && newUser.email ? newUser.email : ""}
                        onChangeText={(text) =>
                          setNewUser((prevState) => ({
                            ...prevState,
                            email: text,
                          }))
                        }
                        size="lg"
                        variant="underlined"
                        w="100%"
                        placeholder="Email Address"
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
                        <Text>Create</Text>
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
  } else {
    return <LoadingScreen setNavbarTransparent={setNavbarTransparent} />;
  }
};

export default CreateListing;
