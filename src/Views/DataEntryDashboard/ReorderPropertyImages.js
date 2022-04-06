import React, { useState } from "react";
import { Button, Modal, Text, useTheme } from "native-base";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableImage from "./SortableImage";

let GetFileBlobUsingURL = function (url, convertBlob) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.addEventListener("load", function () {
    convertBlob(xhr.response);
  });
  xhr.send();
};

let blobToFile = function (blob, name) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return new File([blob], name, { type: "image/png" });
};

let GetFileObjectFromURL = function (filePathOrUrl, convertBlob) {
  GetFileBlobUsingURL(filePathOrUrl, function (blob) {
    convertBlob(blobToFile(blob, "testFile.jpg"));
  });
};

const ReorderPropertyImages = ({
  setShowImagesModal,
  images,
  setUploadImages,
  setTmpImage,
  setListing,
  listing,
}) => {
  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(active, over);

    if (active.id !== over.id) {
      setReorderImages((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const [reorderImages, setReorderImages] = useState(
    typeof images[0] === "string"
      ? images
      : Array.from(images).map((file) => URL.createObjectURL(file))
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleSetImages = () => {
    if (typeof images[0] === "string") {
      setListing((prevState) => ({
        ...prevState,
        images: reorderImages,
      }));
      setUploadImages(undefined);
      setShowImagesModal(false);
    } else {
      // reorderImages is FileList
      let files = [];
      reorderImages.forEach((localURL) => {
        GetFileObjectFromURL(localURL, (file) => {
          files.push(file);
          if (reorderImages.length === files.length) {
            let tmpListing = listing;
            delete tmpListing.images;
            setListing(tmpListing);
            setTmpImage(URL.createObjectURL(files[0]));
            setUploadImages(files);
            setShowImagesModal(false);
          }
        });
      });
    }
  };
  const theme = useTheme();
  return (
    <Modal.Content shadow={0} bg="#f7f7f7">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Modal.CloseButton colorScheme="red" />
        <Modal.Header borderBottomWidth={0}>
          <Text fontSize={20}>Reorder Property Images</Text>
        </Modal.Header>
        <Modal.Body>
          <SortableContext items={reorderImages} strategy={rectSortingStrategy}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(5, 1fr)`,
                gridGap: 10,
                padding: 10,
              }}
            >
              {reorderImages.map((id, idx) => (
                <SortableImage key={id} id={id} idx={idx} />
              ))}
            </div>
          </SortableContext>
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
      </DndContext>
    </Modal.Content>
  );
};

export default ReorderPropertyImages;
