import { extendTheme } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

import "@fontsource/yeseva-one/400.css";
import "@fontsource/inter/500.css";

const feButtonPrimary = defineStyle({
  background:
    window.localStorage.getItem("userTheme") + ".500" ?? "feGreen.500",
  color: "white",
});

const feButtonTheme = defineStyleConfig({
  variants: { feButtonPrimary },
});

const theme = extendTheme({
  fonts: {
    heading: `'Yeseva One', 'Times New Roman', cursive`,
    body: `'Inter', 'Arial', sans-serif`,
  },
  colors: {
    feGreen: {
      50: "#e5fae5",
      100: "#c3ecc3",
      200: "#a0de9e",
      300: "#7cd179",
      400: "#58c454",
      500: "#3eab3b",
      600: "#30852d",
      700: "#205f1f",
      800: "#103a11",
      900: "#001500",
    },
    feOrange: {
      50: "#ffe8de",
      100: "#ffc0b0",
      200: "#ff987e",
      300: "#ff704c",
      400: "#ff481a",
      500: "#e62f00",
      600: "#b42300",
      700: "#811800",
      800: "#500c00",
      900: "#210100",
    },
    fePurple: {
      50: "#f5ebff",
      100: "#d8c7ed",
      200: "#bda3dc",
      300: "#a27ecd",
      400: "#8859be",
      500: "#6e40a5",
      600: "#563281",
      700: "#3d245d",
      800: "#251439",
      900: "#0e0518",
    },
  },
  components: { Button: feButtonTheme },
});

export default theme;
