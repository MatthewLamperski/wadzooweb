import { extendTheme, themeTools } from "native-base";

export const appTheme = extendTheme({
  colors: {
    primary: {
      50: "#dfffdf",
      100: "#b1fdb1",
      200: "#81fa82",
      300: "#51f852",
      400: "#22f622",
      500: "#09dd09",
      600: "#00ac03",
      700: "#007b00",
      800: "#004b00",
      900: "#001b00",
    },
    secondary: {
      50: "#d7feff",
      100: "#aaf3ff",
      200: "#7aebff",
      300: "#48e1ff",
      400: "#1ad8ff",
      500: "#00bfe6",
      600: "#0094b4",
      700: "#006a82",
      800: "#004150",
      900: "#00171f",
    },
    light: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0d0d0d",
    },
  },
  fontConfig: {
    Avenir: {
      100: {
        normal: "Avenir",
      },
      200: {
        normal: "Avenir-Heavy",
      },
      300: {
        normal: "Avenir-Black",
      },
    },
  },
  fonts: {
    heading: "Avenir",
    body: "Avenir",
    mono: "Avenir",
  },
  components: {
    Text: {
      baseStyle: (props) => {
        if (props.button) {
          return {
            color: "lightText"
              ? "lightText"
              : themeTools.mode("darkText", "lightText")(props),
            fontWeight: 200,
          };
        } else if (props.header) {
          return {
            color: themeTools.mode("primary.600", "primary.500")(props),
            fontWeight: 200,
          };
        } else {
          return {
            color: "darkText",
            fontWeight: 200,
          };
        }
      },
    },
    View: {
      baseStyle: (props) => {
        return {
          backgroundColor: themeTools.mode("light.50", "dark.100")(props),
        };
      },
    },
    Button: {
      variants: {
        solid: {
          bg: "primary.500",
          pt: 2,
          pb: 2,
          my: 3,
          shadow: 5,
          rounded: "sm",
        },
        subtle: {
          _text: { fontWeight: 200, fontSize: "sm" },
        },
      },
    },
    Input: {
      baseStyle: (props) => {
        if (props.white) {
          return {
            _focus: { borderColor: "white" },
            fontWeight: 200,
            color: "white",
            borderColor: "white",
            placeholderTextColor: "muted.100",
            h: 16,
            p: 3,
          };
        } else {
          return {
            fontWeight: 200,
            color: "darkText",
          };
        }
      },
      variants: {
        outline: {
          width: "100%",
          borderColor: "muted.400",
          _hover: {
            bg: "transparent",
          },
          fontWeight: 100,
          placeholderTextColor: "muted.500",
        },
      },
    },
    Spinner: {
      baseStyle: (props) => {
        return {
          color: props.button
            ? "lightText"
            : themeTools.mode("black", "white")(props),
        };
      },
    },
    ActionsheetItem: {
      baseStyle: (props) => {
        return {
          _text: { fontWeight: 300, fontSize: "md" },
        };
      },
    },
    ActionsheetContent: {
      baseStyle: (props) => {
        return {
          bg: themeTools.mode("light.50", "dark.200")(props),
        };
      },
    },
    FormControlLabel: {
      baseStyle: (props) => {
        return {
          fontWeight: 200,
        };
      },
    },
  },
  config: {
    useSystemColorMode: true,
  },
});
