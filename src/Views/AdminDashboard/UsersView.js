import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  Box,
  Button,
  Image,
  Modal,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import SearchBar from "../../Components/SearchBar";
import {
  deleteUser,
  getProfilePicURL,
  getUserDoc,
} from "../../FirebaseInterface";
import { AppContext } from "../../AppContext";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import AddCompanyLogo from "../DataEntryDashboard/AddCompanyLogo";

const UsersView = () => {
  const { setError } = useContext(AppContext);
  const theme = useTheme();
  const [selectedUID, setSelectedUID] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showUpdateProfilePic, setShowUpdateProfilePic] = useState(false);
  const cancelRef = useRef(null);
  useEffect(() => {
    if (selectedUID) {
      getUserDoc(selectedUID)
        .then((userDoc) => setSelectedUser(userDoc))
        .catch((err) => {
          setSelectedUser(null);
          setError({
            title: "Couldn't load user",
            message: "Please try again",
          });
        });
      getProfilePicURL(selectedUID)
        .then((url) => setPhotoURL(url))
        .catch((err) => {
          setPhotoURL();
          console.log(err);
        });
    }
  }, [selectedUID]);
  return (
    <div style={styles.backgroundStyle} className="p-3">
      <div className="p-3" style={styles.rowStyle}>
        <Text color="secondary.800" fontWeight={300} fontSize={24}>
          Manage Users
        </Text>
        <SearchBar setUserSelected={setSelectedUID} index="users" />
      </div>
      {selectedUID ? (
        <div style={styles.containerStyle}>
          {selectedUser === undefined ? (
            <Spinner color="primary.500" />
          ) : selectedUser === null ? (
            <Text>No user</Text>
          ) : (
            <div
              style={{ wordBreak: "break-word" }}
              className="d-flex flex-grow-1 flex-column"
            >
              <div className="d-flex">
                <Pressable
                  display="flex"
                  my={2}
                  onPress={() => setShowUpdateProfilePic(true)}
                >
                  {({ isHovered }) => {
                    if (isHovered) {
                      return (
                        <Box
                          w={40}
                          h={40}
                          borderRadius={80}
                          borderWidth={1}
                          borderColor="primary.500"
                          bg="muted.500"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text color="white">Change Profile Picture</Text>
                        </Box>
                      );
                    } else {
                      return (
                        <Image
                          key={photoURL ? photoURL : "wadzoo.com"}
                          height={40}
                          alt="Profile"
                          width={40}
                          borderRadius={80}
                          borderWidth={1}
                          borderColor="primary.500"
                          source={{
                            uri: photoURL ? photoURL : "wadzoo.com",
                          }}
                          fallbackElement={
                            <Box
                              w={40}
                              h={40}
                              borderRadius={80}
                              borderWidth={1}
                              borderColor="primary.500"
                              bg="muted.500"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <FaUser
                                color={theme.colors.lightText}
                                size={10}
                              />
                            </Box>
                          }
                        />
                      );
                    }
                  }}
                </Pressable>
              </div>

              <Text>First Name: {selectedUser.firstName}</Text>
              <Text>Last Name: {selectedUser.lastName}</Text>
              <Text>Email: {selectedUser.email}</Text>
              <Text>Display Name: {selectedUser.displayName}</Text>
              {selectedUser.location && (
                <Text>
                  Location: {selectedUser.location.locality}{" "}
                  {selectedUser.location.adminArea}
                </Text>
              )}
              <Text>
                Badge: {selectedUser.badge ? selectedUser.badge : "beginner"}
              </Text>
              <Text>Posts: {JSON.stringify(selectedUser.posts)}</Text>
              <Text>PhotoURL: {photoURL}</Text>
              <Button
                position="absolute"
                top={0}
                right={0}
                m={4}
                variant="subtle"
                colorScheme="error"
                onPress={() => setOpenDeleteDialog(true)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Text>Search for user and you can manage them here.</Text>
      )}
      <Modal
        isOpen={showUpdateProfilePic}
        onClose={() => setShowUpdateProfilePic(false)}
        _backdrop={{ bg: "warmGray.500" }}
        size="xl"
      >
        <AddCompanyLogo
          header="Update User Profile Picture"
          uid={selectedUID}
          setListerPPUrl={setPhotoURL}
          setShowCompanyLogoModal={setShowUpdateProfilePic}
        />
      </Modal>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <AlertDialog.Content bg="white">
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <Text>Delete User</Text>
          </AlertDialog.Header>
          <AlertDialog.Body color="muted.500">
            <Text color="muted.500">
              This will remove all data relating to this user. This action is
              irreversible
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
                  deleteUser(selectedUID)
                    .then((result) => {
                      toast.success(
                        `User deleted. ${
                          result ? "Profile picture deleted as well!" : ""
                        }`
                      );
                      setSelectedUser();
                      setSelectedUID();
                      setOpenDeleteDialog(false);
                    })
                    .catch((err) =>
                      setError({
                        title: "Something went wrong.",
                        message: "Try again later.",
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
    </div>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    background: `linear-gradient(-45deg, #00D4FF40, #39F73940)`,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  rowStyle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 30,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    position: "relative",
  },
};
export default UsersView;
