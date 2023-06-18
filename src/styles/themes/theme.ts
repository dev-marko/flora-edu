import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

import feGreen from "@themes/feGreen";
import feOrange from "@themes/feOrange";
import fePurple from "@themes/fePurple";

import "@fontsource/yeseva-one/400.css";
import "@fontsource/inter/500.css";

const theme = {
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  colors: feGreen.colors,
  semanticTokens: {
    colors: {
      fePrimary: "primary.500",
      fePrimaryContainer: "primary.300",
      feGreen: {
        ...feGreen.colors.primary,
      },
      feOrange: {
        ...feOrange.colors.primary,
      },
      fePurple: {
        ...fePurple.colors.primary,
      },
    },
  },
  fonts: {
    heading: `'Yeseva One', 'Times New Roman', cursive`,
    body: `'Inter', 'Arial', sans-serif`,
  },
};

export default extendTheme(
  // This will set the default colorScheme for all buttons as `primary`
  withDefaultColorScheme({
    colorScheme: "primary",
    components: ["Button", "Switch", "Slider", "SliderTrack"],
  }),
  theme
);
