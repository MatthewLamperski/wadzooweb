import React, { useEffect, useState } from "react";
import { Text, useTheme } from "native-base";
import { FaHome, FaMoneyBillWave, FaReceipt } from "react-icons/all";
import {
  getAppInfo,
  getSubscriptions,
  getTodaysProperties,
} from "../../FirebaseInterface";

const AnalyticsView = () => {
  const theme = useTheme();
  const [subscriptions, setSubscriptions] = useState();
  const [appInfo, setAppInfo] = useState();
  const [todaysProperties, setTodaysProperties] = useState();
  useEffect(() => {
    getSubscriptions()
      .then((subs) => setSubscriptions(subs))
      .catch((err) => console.log(err));
    getAppInfo()
      .then((info) => setAppInfo(info))
      .catch((err) => console.log(err));
    getTodaysProperties()
      .then((properties) => setTodaysProperties(properties))
      .catch((err) => console.log(err));
  }, []);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div style={styles.backgroundStyle} className="p-3">
      <div style={styles.rowStyle}>
        <div style={styles.containerStyle}>
          <FaHome
            style={{ marginBottom: 10 }}
            color={theme.colors.primary["400"]}
            size={24}
          />
          <Text color="secondary.800" fontWeight={300} fontSize={24}>
            Total Properties
          </Text>
          <Text fontSize={16} color="muted.400" fontWeight={300}>
            {appInfo && appInfo.listingsCount}
          </Text>
          <Text color="secondary.800" fontWeight={300} fontSize={24}>
            Uploaded Today
          </Text>
          <Text fontSize={16} color="muted.400" fontWeight={300}>
            {todaysProperties && todaysProperties.length}
          </Text>
        </div>
      </div>
      <div style={styles.rowStyle}>
        <div style={styles.containerStyle}>
          <FaMoneyBillWave
            style={{ marginBottom: 10 }}
            color={theme.colors.primary["400"]}
            size={24}
          />
          <Text color="secondary.800" fontWeight={300} fontSize={24}>
            Total Revenue
          </Text>
          <Text fontSize={16} color="muted.400" fontWeight={300}>
            {subscriptions && formatter.format(subscriptions.totalRevenue)}
          </Text>
        </div>
        <div style={styles.containerStyle}>
          <FaReceipt
            style={{ marginBottom: 10 }}
            color={theme.colors.primary["400"]}
            size={24}
          />
          <Text color="secondary.800" fontWeight={300} fontSize={24}>
            Total Purchases
          </Text>
          <Text fontSize={16} color="muted.400" fontWeight={300}>
            {subscriptions && subscriptions.totalPurchases}
          </Text>
        </div>
      </div>
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
    margin: 10,
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default AnalyticsView;
