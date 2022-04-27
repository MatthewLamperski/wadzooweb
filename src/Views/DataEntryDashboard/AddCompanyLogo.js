import React, { useContext, useEffect, useRef, useState } from "react";
import { FaImage, FaLink, FaTimesCircle } from "react-icons/all";
import {
  Button,
  Input,
  Modal,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { AppContext } from "../../AppContext";
import { uploadProfilePic } from "../../FirebaseInterface";
import { toast } from "react-toastify";

const AddCompanyLogo = ({
  setListerPPUrl,
  setShowCompanyLogoModal,
  uid,
  header,
}) => {
  const theme = useTheme();
  const { setError } = useContext(AppContext);
  const [link, setLink] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);
  let dragCounter = 0;
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter--;
    if (dragCounter > 0) return;
    setDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedImage(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };
  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);

    return () => {
      if (div) {
        div.removeEventListener("dragenter", handleDragIn);
        div.removeEventListener("dragleave", handleDragOut);
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop);
      }
    };
  }, []);
  const handleUploadLogo = () => {
    if (link) {
      setUploading(true);
      console.log(link);
      fetch(link)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], uid, { type: blob.type });
          if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "images/jpg"
          ) {
            uploadProfilePic(uid, file)
              .then((url) => {
                console.log(url);
                if (setListerPPUrl) {
                  setListerPPUrl(url);
                }
                toast.success("Profile picture uploaded successfully");
                setShowCompanyLogoModal(false);
              })
              .catch((err) => {
                setLink();
                setUploading(false);
                console.log(err);
                setError({
                  title: "No image found",
                  message:
                    "That link did not return an image. If issue persists, download the file and upload the other way. Error" +
                    JSON.stringify(err),
                });
              });
          } else {
            console.log(file.type);
            setLink();
            setUploading(false);
            setError({
              title: "No image found",
              message:
                "That link did not return an image. If issue persists contact Matthew. File Type" +
                JSON.stringify(file.type),
            });
          }
        })
        .catch((err) => {
          setLink();
          setUploading(false);
          console.log(err);
          setError({
            title: "No image found",
            message:
              "That link did not return an image. If issue persists, download the file and upload the other way. Error" +
              JSON.stringify(err),
          });
        });
    } else if (selectedImage) {
      setUploading(true);
      if (
        selectedImage.type === "image/jpeg" ||
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/jpg"
      ) {
        uploadProfilePic(uid, selectedImage)
          .then((url) => {
            console.log(url);
            if (setListerPPUrl) {
              setListerPPUrl(url);
            }
            toast.success("Company Logo uploaded successfully");
            setShowCompanyLogoModal(false);
          })
          .catch((err) => {
            setSelectedImage();
            setUploading(false);
            setShowCompanyLogoModal(false);
            console.log(err);
            setError({
              title: "No image found",
              message:
                "That link did not return an image. If issue persists contact Matthew.",
            });
          });
      } else {
        setError({
          title: "This is not an image",
          message: `File type: ${selectedImage.type}`,
        });
        setSelectedImage();
        setUploading(false);
      }
    } else {
      setError({
        title: "No input",
        message: "Please input either a link or a file.",
      });
    }
  };
  return (
    <Modal.Content shadow={0} bg="white">
      <Modal.CloseButton colorScheme="red" />
      <Modal.Header borderBottomWidth={0}>
        <Text fontSize={20}>{header}</Text>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            backgroundColor: "white",
            height: 500,
            width: "100%",
            borderRadius: 8,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
            display: "flex",
            flexDirection: "column",
          }}
          className="p-1"
        >
          <PresenceTransition
            style={{
              display: "flex",
              flex: 1,
            }}
            visible={!link}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 500 } }}
          >
            <div
              ref={dropRef}
              style={{
                backgroundColor: dragging
                  ? theme.colors.secondary["50"]
                  : "white",
                borderRadius: 8,
                border: `3px dotted ${theme.colors.secondary["800"]}`,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaImage color={theme.colors.secondary["800"]} size={60} />
              <Text py={3} fontWeight={300} fontSize={18} color="secondary.800">
                Drop your image here, or{" "}
                <label
                  style={{
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    accept="image/png image/jpeg"
                    style={{ display: "none" }}
                    onChange={({ target }) => {
                      setSelectedImage(target.files[0]);
                    }}
                  />
                  <Text color="primary.500">Browse</Text>
                </label>
              </Text>
              {selectedImage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text fontSize={16} color="muted.400">
                    {selectedImage.name}
                  </Text>
                  <Pressable p={2} onPress={() => setSelectedImage()}>
                    <FaTimesCircle color="red" size={20} />
                  </Pressable>
                </div>
              )}
            </div>
          </PresenceTransition>
          <PresenceTransition
            visible={!selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 500 } }}
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
              <FaLink color={theme.colors.secondary["800"]} size={50} />
              <Input
                my={3}
                onChangeText={(text) => setLink(text)}
                variant="underlined"
                value={link ? link : ""}
                placeholder="Enter Link"
                size="lg"
              />
            </div>
          </PresenceTransition>
        </div>
      </Modal.Body>
      <Modal.Footer py={0} bg="white">
        <Button.Group space={2}>
          <Button
            my={3}
            variant="ghost"
            colorScheme="red"
            onPress={() => setShowCompanyLogoModal(false)}
          >
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleUploadLogo}>
            {uploading ? (
              <Spinner color="white" />
            ) : (
              <Text>Set Profile Picture</Text>
            )}
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
};

export default AddCompanyLogo;
