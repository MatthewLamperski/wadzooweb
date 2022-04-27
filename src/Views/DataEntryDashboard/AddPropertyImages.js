import React, { useContext, useEffect, useRef, useState } from "react";
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
import { FaImage, FaLink, FaTimesCircle } from "react-icons/all";
import { AppContext } from "../../AppContext";
import { toast } from "react-toastify";

const AddPropertyImages = ({
  setShowImagesModal,
  setTmpImage,
  setListing,
  setUploadImages,
}) => {
  const { setError } = useContext(AppContext);
  const theme = useTheme();
  const [links, setLinks] = useState();
  const [images, setImages] = useState();
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
      setImages(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };
  useEffect(() => {
    let div = dropRef.current;
    if (div) {
      div.addEventListener("dragenter", handleDragIn);
      div.addEventListener("dragleave", handleDragOut);
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);
    }

    return () => {
      if (div) {
        div.removeEventListener("dragenter", handleDragIn);
        div.removeEventListener("dragleave", handleDragOut);
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop);
      }
    };
  }, []);
  const handleUploadImages = () => {
    if (links) {
      setUploading(true);
      setListing((prevState) => ({
        ...prevState,
        images: links,
      }));
      setShowImagesModal(false);
      setUploading(false);
      toast.success("Images added successfully");
    } else if (images) {
      setUploading(true);
      // images is FileList
      for (let i = 0; i < images.length; i++) {
        if (
          !(
            images[i].type === "image/jpeg" ||
            images[i].type === "image/png" ||
            images[i].type === "images/jpg"
          )
        ) {
          setError({
            title: "This is not an image",
            message: `File type: ${images[i].type}`,
          });
          setUploading(false);
          return;
        }
      }
      setTmpImage(URL.createObjectURL(images[0]));
      setUploadImages(images);
      setUploading(false);
      setShowImagesModal(false);
      toast.success("Images added successfully");
    }
  };
  return (
    <Modal.Content shadow={0} bg="white">
      <Modal.CloseButton colorScheme="red" />
      <Modal.Header borderBottomWidth={0}>
        <Text fontSize={20}>Add Property Images</Text>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            borderRadius: 8,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflow: "scroll",
          }}
          className="p-1"
        >
          <PresenceTransition
            style={{
              display: "flex",
              flex: 1,
            }}
            visible={!links}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 500 } }}
          >
            <div
              ref={dropRef}
              className="py-4"
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
                Drop your images here, or{" "}
                <label
                  style={{
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  <input
                    multiple
                    type="file"
                    accept="image/png image/jpeg"
                    style={{ display: "none" }}
                    onChange={({ target }) => {
                      setImages(target.files);
                    }}
                  />
                  <Text color="primary.500">Browse</Text>
                </label>
              </Text>
              {images && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text fontSize={16} color="muted.400">
                    {images.length} Images
                  </Text>
                  <Pressable p={2} onPress={() => setImages()}>
                    <FaTimesCircle color="red" size={20} />
                  </Pressable>
                </div>
              )}
            </div>
          </PresenceTransition>
          <PresenceTransition
            visible={!images && !links}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 500 } }}
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text>or, enter links</Text>
          </PresenceTransition>
          <PresenceTransition
            visible={!images}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 500 } }}
            style={{
              borderRadius: 8,
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <div className="d-flex flex-grow-1 flex-column justify-content-center align-items-center py-4">
              <FaLink color={theme.colors.secondary["800"]} size={50} />
              <Input
                flex={1}
                display="flex"
                my={3}
                onChangeText={(text) => setLinks(text ? [text] : undefined)}
                variant="underlined"
                value={links ? links[0] : ""}
                placeholder="Enter Link"
                size="lg"
              />
              {links &&
                links.length >= 1 &&
                links.slice(1).map((link, idx) => (
                  <Input
                    key={idx}
                    my={3}
                    onChangeText={(text) =>
                      setLinks((prevState) => [
                        prevState[0],
                        ...prevState.slice(1, idx + 1),
                        text,
                        ...prevState.slice(idx + 2),
                      ])
                    }
                    variant="underlined"
                    value={links ? links[idx + 1] : ""}
                    placeholder="Enter Link"
                    size="lg"
                    InputRightElement={
                      <Pressable
                        p={2}
                        onPress={() => {
                          setLinks((prevState) => [
                            prevState[0],
                            ...prevState.slice(1, idx + 1),
                            ...prevState.slice(idx + 2),
                          ]);
                        }}
                      >
                        <FaTimesCircle color={theme.colors.red["500"]} />
                      </Pressable>
                    }
                  />
                ))}
              {links && links.length >= 1 && (
                <Button
                  variant="subtle"
                  onPress={() => setLinks((prevState) => [...prevState, ""])}
                >
                  Add Another URL
                </Button>
              )}
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
            onPress={() => setShowImagesModal(false)}
          >
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleUploadImages}>
            {uploading ? <Spinner color="white" /> : <Text>Set Images</Text>}
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
};

export default AddPropertyImages;
