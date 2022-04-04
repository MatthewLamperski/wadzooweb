import React, { useState } from "react";
import { Button, Modal, Text } from "native-base";

const ReorderPropertyImages = ({
  setShowImagesModal,
  images,
  setUploadImages,
  setTmpImage,
  setListing,
}) => {
  const [reorderImages, setReorderImages] = useState(images);
  const handleSetImages = () => {};
  return (
    <Modal.Content shadow={0} bg="white">
      <Modal.CloseButton colorScheme="red" />
      <Modal.Header borderBottomWidth={0}>
        <Text fontSize={20}>Add Property Images</Text>
      </Modal.Header>
      <Modal.Body>
        {typeof images[0] === "string" ? (
          <Text>Strings</Text>
        ) : (
          <Text>{URL.createObjectURL(images[0])}</Text>
        )}
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
          <Button onPress={handleSetImages}>
            <Text>Update</Text>
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  );
};

export default ReorderPropertyImages;
