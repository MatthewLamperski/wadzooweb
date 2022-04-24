import React, { useContext, useEffect, useState } from "react";
import { Menu, Pressable, Spinner, Text, useTheme } from "native-base";
import {
  getAffiliateDoc,
  getMonthAffiliatePurchases,
} from "../FirebaseInterface";
import { AppContext } from "../AppContext";
import { FaCartPlus, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { FaDollarSign } from "react-icons/all";

const AffiliateSummaryPanel = () => {
  const theme = useTheme();
  const { user, setError } = useContext(AppContext);
  const [affiliateInfo, setAffiliateInfo] = useState();
  const [monthPurchases, setMonthPurchases] = useState();
  const [monthRenewals, setMonthRenewals] = useState();
  const [loading, setLoading] = useState(true);
  const [purchasesLoading, setPurchasesLoading] = useState(true);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  useEffect(() => {
    getAffiliateInfo();
  }, []);
  useEffect(() => {
    getThisMonthsPurchases();
  }, [affiliateInfo]);
  const getAffiliateInfo = () => {
    if (user) {
      setLoading(true);
      getAffiliateDoc(user.uid)
        .then((affiliateDoc) => {
          setAffiliateInfo(affiliateDoc);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError({
            title: "Something went wrong...",
            message: "Couldn't load your affiliate information.",
          });
        });
    }
  };
  const getThisMonthsPurchases = () => {
    if (affiliateInfo) {
      setPurchasesLoading(true);
      getMonthAffiliatePurchases(affiliateInfo.docID)
        .then((purchases) => {
          setMonthPurchases(purchases);
          setPurchasesLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPurchasesLoading(false);
        });
    }
  };
  const getThisMonthsRenewals = () => {
    if (affiliateInfo) {
    }
  };
  const calculateBalance = () => {
    let initalBalance =
      monthPurchases
        .map((purchase) => Number(purchase.convertedPrice))
        .reduce((partialSum, num) => partialSum + num, 0) * 0.5;
    if (affiliateInfo.parent) {
      initalBalance = initalBalance * Number(`0.${affiliateInfo.parent.share}`);
    }
    return formatter.format(initalBalance);
  };
  return (
    <div style={styles.containerStyle}>
      {loading ? (
        <Spinner color="primary.500" />
      ) : (
        <>
          <div className="d-flex">
            <Menu
              bg="white"
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    bg="light.50"
                    rounded={10}
                    px={3}
                    mb={2}
                    p={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    {...triggerProps}
                  >
                    <Text fontWeight={300} fontSize={24} color="secondary.800">
                      {affiliateInfo.promoCode}
                    </Text>
                    <FaChevronDown
                      color={theme.colors.secondary["800"]}
                      size={18}
                    />
                  </Pressable>
                );
              }}
            >
              <Menu.Item
                _focus={{ bg: "white" }}
                _hover={{ bg: "light.50" }}
                bg="white"
                onPress={() =>
                  toast.info(
                    "This feature has not been set up yet and is coming soon!"
                  )
                }
              >
                Change Code
              </Menu.Item>
            </Menu>
          </div>
          <Text color="muted.500">This Month</Text>
          {purchasesLoading ? null : (
            <Row className="d-flex flex-grow-1">
              <Col xs={12} sm={6}>
                <div style={styles.stats}>
                  <div className="d-flex flex-column">
                    <Text>Balance</Text>
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <div
                        style={{ backgroundColor: theme.colors.primary["200"] }}
                        className="circle me-2"
                      >
                        <FaDollarSign color="black" />
                      </div>
                      <Text fontSize={22}>{calculateBalance()}</Text>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div style={styles.stats}>
                  <div className="d-flex flex-column">
                    <Text>New Purchases</Text>
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      <div
                        style={{ backgroundColor: theme.colors.primary["200"] }}
                        className="circle me-2"
                      >
                        <FaCartPlus color="black" />
                      </div>
                      <Text fontSize={22}>{monthPurchases.length}</Text>
                    </div>
                  </div>
                </div>
              </Col>
              {/*<Col xs={12} sm={6}>*/}
              {/*  <div style={styles.stats}>*/}
              {/*    <div className="d-flex flex-column">*/}
              {/*      <Text>Revenue</Text>*/}
              {/*      <div className="d-flex flex-row justify-content-start align-items-center">*/}
              {/*        <div*/}
              {/*          style={{ backgroundColor: theme.colors.primary["200"] }}*/}
              {/*          className="circle me-2"*/}
              {/*        >*/}
              {/*          <FaMoneyBill color="black" />*/}
              {/*        </div>*/}
              {/*        <Text fontSize={22}>*/}
              {/*          {formatter.format(*/}
              {/*            monthPurchases*/}
              {/*              .map((purchase) => Number(purchase.convertedPrice))*/}
              {/*              .reduce((partialSum, num) => partialSum + num, 0)*/}
              {/*          )}*/}
              {/*        </Text>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</Col>*/}
            </Row>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
  },
  stats: {
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 20,
    backgroundColor: "#f0f0f0",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
};

export default AffiliateSummaryPanel;
