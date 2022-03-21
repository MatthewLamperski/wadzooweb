import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  PresenceTransition,
  Pressable,
  Select,
  Spinner,
  Text,
  TextArea,
  useTheme,
} from "native-base";
import { Col, Container, Row } from "react-bootstrap";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import { createUser, findUsersByEmail } from "../../FirebaseInterface";
import {
  FaCheck,
  FaEllipsisH,
  FaTimes,
  FaTrash,
  FaTrashAlt,
} from "react-icons/all";
import { toast } from "react-toastify";

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

const CreateListing = ({ setNavbarTransparent }) => {
  const { user, setError } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const [listerEmail, setListerEmail] = useState();
  const [listing, setListing] = useState();
  const [emailSearchResults, setEmailSearchResults] = useState();
  const [emailSearchLoading, setEmailSearchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
    if (!createLoading) {
      setCreateLoading(true);
    } else {
      setCreateLoading(false);
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
  const validated = () => {};
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
                      {listing && listing.listerObj ? (
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
                                  console.log(tmpListing);
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
                              <Text fontWeight={100}>
                                {listing.listerObj.email}
                              </Text>
                            </div>
                          </Box>
                        </div>
                      ) : (
                        <div className="py-3">
                          <Text fontSize={16} color="secondary.800">
                            Lister:
                          </Text>
                          <Input
                            onChangeText={(text) => setListerEmail(text)}
                            value={listerEmail ? listerEmail : ""}
                            fontSize={16}
                            placeholder="Start typing email"
                            variant="outline"
                          />
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
                                    listerObj: user,
                                  }));
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
                            onChangeText={(text) =>
                              setListing((prevState) => ({
                                ...prevState,
                                phoneNumber: text,
                              }))
                            }
                            value={
                              listing && listing.phoneNumber
                                ? listing.phoneNumber
                                : ""
                            }
                            placeholder="1234567890"
                            variant="outline"
                            size="lg"
                          />
                          <FormControl.HelperText>
                            Must be 10 digits, only numbers.
                          </FormControl.HelperText>
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
                        <FormControl.HelperText>
                          Only the street address, not the city/state.
                        </FormControl.HelperText>
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
                            <FormControl.HelperText>
                              Only numbers
                            </FormControl.HelperText>
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
                            <FormControl.HelperText>
                              Only numbers
                            </FormControl.HelperText>
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
                        <FormControl.HelperText>
                          Only numbers, no commas or dollar signs
                        </FormControl.HelperText>
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
                        <FormControl.HelperText>
                          If you don't see the exact type, pick the closest one.
                        </FormControl.HelperText>
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
                        <FormControl.HelperText>
                          At least one image is required, the more the better!
                        </FormControl.HelperText>
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
                        <FormControl py={2}>
                          <FormControl.Label>
                            Occupancy Status
                          </FormControl.Label>
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
                            placeholder="Occupied"
                            variant="outline"
                            size="sm"
                          />
                        </FormControl>
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
                <Container
                  className="pt-5"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    overflowWrap: "break-word",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      color: theme.colors.secondary["800"],
                      fontFamily: "Avenir-Black",
                    }}
                  >
                    Preview:
                  </h3>
                </Container>
                <div
                  className="p-3 m-3"
                  style={{
                    borderRadius: 8,
                    backgroundColor: "white",
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
                  }}
                >
                  <Text fontSize={18}>Listing:</Text>
                  <Text fontSize={12}>{JSON.stringify(listing, null, 2)}</Text>
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
