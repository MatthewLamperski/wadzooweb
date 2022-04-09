import React from "react";
import { Text, useTheme } from "native-base";
import { FaTools } from "react-icons/all";

const WhitelistView = () => {
  const theme = useTheme();
  return (
    <div style={styles.backgroundStyle} className="p-3">
      <div style={styles.containerStyle}>
        <FaTools
          style={{ marginBottom: 10 }}
          color={theme.colors.muted["400"]}
          size={24}
        />
        <Text color="secondary.800" fontWeight={300} fontSize={24}>
          Whitelist
        </Text>
        <Text color="muted.400" fontWeight={300}>
          This page is still being built.
        </Text>
      </div>
    </div>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    background: `linear-gradient(-45deg, #00D4FF40, #39F73940)`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default WhitelistView;
