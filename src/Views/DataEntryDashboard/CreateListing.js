import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import {
  Box,
  Button,
  HStack,
  Input,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { Container } from "react-bootstrap";
import AccessDenied from "../AccessDenied";
import LoadingScreen from "../LoadingScreen";
import { findUsersByEmail } from "../../FirebaseInterface";
import { FaCheck, FaEllipsisH, FaTrash, FaTrashAlt } from "react-icons/all";

const CreateListing = ({ setNavbarTransparent }) => {
  const { user } = useContext(AppContext);
  const [navbarHeight, setnavbarHeight] = useState();
  const [listerEmail, setListerEmail] = useState();
  const [listing, setListing] = useState();
  const [emailSearchResults, setEmailSearchResults] = useState();
  const [emailSearchLoading, setEmailSearchLoading] = useState(false);
  useEffect(() => {
    if (listerEmail) setEmailSearchLoading(true);
    const delayDebounce = setTimeout(() => {
      if (listerEmail && listerEmail.length > 5) {
        console.log("Finding");
        findUsersByEmail(listerEmail)
          .then((users) => {
            setEmailSearchLoading(false);
            setEmailSearchResults(users);
          })
          .catch((err) => {
            setEmailSearchLoading(false);
            console.log(err);
          });
      } else {
        console.log("not searching");
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
                  <div style={{ height: "200vh" }}>
                    <Text fontWeight={300} fontSize={18}>
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
                          <Text fontSize={16}>Lister:</Text>
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
                          borderWidth={1}
                          borderColor="primary.500"
                          style={{ display: "flex", flexDirection: "column" }}
                          rounded={8}
                          shadow={2}
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
                            <Text fontWeight={100}>{user.email}</Text>
                          </div>
                        </Box>
                      </div>
                    ) : (
                      <div className="py-3">
                        <Text fontSize={16}>Lister:</Text>
                        <Input
                          onChangeText={(text) => setListerEmail(text)}
                          value={listerEmail ? listerEmail : ""}
                          fontSize={16}
                          placeholder="Start typing email"
                          variant="outline"
                        />
                        {emailSearchLoading && (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <Spinner color="primary.500" />
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
                              borderRadius={8}
                              _hover={{ shadow: 5 }}
                              bg="white"
                              shadow={1}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                className="p-2"
                                style={{
                                  flexDirection: "column",
                                  display: "flex",
                                }}
                              >
                                <Text>{`${user.firstName} ${user.lastName}`}</Text>
                                <Text fontWeight={100}>{user.email}</Text>
                              </div>
                            </Pressable>
                          ))}
                      </div>
                    )}
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
                  <Button>
                    <Text button>Create</Text>
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
                  <Text fontSize={18}>Preview Here</Text>
                </div>
              </div>
            </div>
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
