import { rgba } from "polished";
import { breakpoints } from "./breakpoints";

export const actionThemes = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  light: "light",
  dark: "dark",
};

const defaultColors = {
  primary: "#473bf0",
  primaryHover: "#1c10cf",
  secondary: "#f64b4b",
  light: "#fcfdfe",
  dark: "#161c2d",
  yellow: "#fedc5a",
  ash: "#413e65",
  green: "#68d585",
  info: "#0e567c",
};

const colors = {
  primary: defaultColors.primary,
  primaryHover: defaultColors.primaryHover,
  secondary: defaultColors.secondary,
  light: defaultColors.light,
  lightShade: rgba(defaultColors.light, 0.7),
  dark: defaultColors.dark,
  darkShade: rgba(defaultColors.dark, 0.7),
  ash: defaultColors.ash,
  bg: defaultColors.light,
  bg2: "#f4f7fa",
  bg3: "#f8f8f8",
  bg4: "#fdfdff",
  bg5: "#ecf2f7",
  bg6: "#fff",
  bg7: "#EDF9F2",
  border: "#e7e9ed",
  error: "#ed1c24",
  shadow: rgba(defaultColors.dark, 0.15),
  heading: defaultColors.dark,
  text: rgba(defaultColors.dark, 0.7),
  warning: defaultColors.yellow,
  success: defaultColors.green,
  info: defaultColors.info,

  modes: {
    dark: {
      primary: defaultColors.primary,
      primaryHover: defaultColors.primaryHover,
      secondary: defaultColors.secondary,
      light: defaultColors.light,
      lightShade: rgba(defaultColors.light, 0.7),
      dark: defaultColors.dark,
      darkShade: rgba(defaultColors.dark, 0.7),
      ash: defaultColors.ash,
      bg: defaultColors.light,
      bg2: "#f4f7fa",
      bg3: "#f8f8f8",
      bg4: "#fdfdff",
      bg5: "#ecf2f7",
      bg6: "#fff",
      bg7: "#EDF9F2",
      border: "#e7e9ed",
      shadow: rgba(defaultColors.dark, 0.15),
      heading: defaultColors.dark,
      text: rgba(defaultColors.dark, 0.7),
      warning: defaultColors.yellow,
      success: defaultColors.green,
      info: defaultColors.info,
    },
  },
};

const layouts = {
  boxed: "boxed",
  wide: "wide",
};

const headerVariants = {
  align: {
    left: "left",
    right: "right",
    center: "center",
  },
  button: {
    cta: "cta",
    account: "account",
  },
  theme: {
    dark: "dark",
    light: "light",
  },
};

const theme = {
  initialColorModeName: "light",
  colors: colors,
  space: [
    0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52, 56, 60, 64, 72, 84, 100,
    120, 140,
  ],
  layouts,
  headerVariants,
  breakpoints: [
    `${breakpoints.sm}px`,
    `${breakpoints.md}px`,
    `${breakpoints.lg}px`,
    `${breakpoints.xl}px`,
  ],
};

export default theme;
