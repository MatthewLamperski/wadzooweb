import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Text, useTheme } from "native-base";

const SortableImage = ({ id, idx }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const theme = useTheme();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    height: 200,
    width: "auto",
    margin: 1,
    display: "flex",
    borderRadius: 8,
    border: "1px solid lightgray",
    padding: 2,
    backgroundColor: "white",
    flexDirection: "column",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        key={id}
        className="my-auto mx-auto"
        style={{
          objectFit: "contain",
          flex: 1,
          width: "100%",
          height: "100%",
          borderRadius: 8,
        }}
        src={id}
        alt="Couldn't Load"
      />
      <Text>{idx + 1}</Text>
    </div>
  );
};

export default SortableImage;
