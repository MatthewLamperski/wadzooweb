import React, { useContext } from "react";
import { Pressable, Text, useTheme } from "native-base";
import { Col, Container, Row } from "react-bootstrap";
import { AppContext } from "../../AppContext";
import { FaPlusCircle, FaTasks } from "react-icons/all";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DataEntryDashboard = () => {
  const { user, setError } = useContext(AppContext);
  const camelToWords = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  const navigate = useNavigate();
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
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
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
        <h3
          style={{
            color: theme.colors.muted["500"],
            fontFamily: "Avenir-Black",
          }}
        >
          Your role is {user && camelToWords(user.role)}.
        </h3>
      </Container>
      <Container className="d-flex flex-grow-1 pb-5">
        <Row style={styles.rowStyle}>
          <Col xs={10} md={6}>
            <Pressable
              style={styles.actionContainer}
              onPress={() => navigate("/createListing")}
            >
              <div style={styles.titleContainer}>
                <FaPlusCircle
                  style={styles.iconStyle}
                  color={theme.colors.secondary["800"]}
                />
                <Text fontSize={18} fontWeight={300} color="secondary.800">
                  Create Listings
                </Text>
              </div>
              <div style={styles.contentContainer}>
                <Text color="muted.400">
                  Here you can add new listings and create new associated user
                  accounts.
                </Text>
              </div>
              <Pressable
                style={styles.buttonContainer}
                onPress={() => navigate("/createListing")}
              >
                <Text fontSize={18}>Go</Text>
                <FaChevronRight color={theme.colors.secondary["800"]} />
              </Pressable>
            </Pressable>
          </Col>
          <Col className="my-3" xs={10} md={6}>
            <Pressable
              style={styles.actionContainer}
              onPress={() => navigate("/manageListings")}
            >
              <div style={styles.titleContainer}>
                <FaTasks
                  style={styles.iconStyle}
                  color={theme.colors.secondary["800"]}
                />
                <Text fontSize={18} fontWeight={300} color="secondary.800">
                  Manage Listings
                </Text>
              </div>
              <div style={styles.contentContainer}>
                <Text color="muted.400">
                  Here you can delete old listings, edit and change listing
                  information.
                </Text>
              </div>
              <Pressable style={styles.buttonContainer}>
                <Text fontSize={18}>Go</Text>
                <FaChevronRight color={theme.colors.secondary["800"]} />
              </Pressable>
            </Pressable>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  rowStyle: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flex: 1,
  },
  iconStyle: {
    margin: 10,
  },
  actionContainer: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.09)",
    padding: 10,
    flexDirection: "column",
    display: "flex",
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
};

export default DataEntryDashboard;
