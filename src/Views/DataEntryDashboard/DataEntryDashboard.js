import React, { useContext, useEffect } from "react";
import { Text, useTheme } from "native-base";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "../../AppContext";
import CreateListing from "./CreateListing";
import ManageListings from "./ManageListings";
const DataEntryDashboard = () => {
  const { user } = useContext(AppContext);
  useEffect(() => {
    getDocs(collection(db, "users")).then((snapshot) => {
      console.log("users", snapshot.docs.length);
    });
  }, []);
  const theme = useTheme();
  return (
    <div
      className="d-flex"
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#EDf0F3",
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
        <h1
          style={{
            color: theme.colors.secondary["800"],
            fontFamily: "Avenir-Black",
          }}
        >
          Welcome back, {user && `${user.firstName}.`}
        </h1>
      </Container>
      <div
        className="p-3 m-3"
        style={{
          borderRadius: 8,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
        }}
      >
        <Text fontSize={18}>Actions:</Text>
      </div>
    </div>
  );
};

export default DataEntryDashboard;
