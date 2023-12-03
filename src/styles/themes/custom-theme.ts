import {
  ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react';

import '@fontsource/yeseva-one/400.css';

import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/800.css';
import '@fontsource/playfair-display/900.css';

import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

import feBlue from '@themes/feBlue';
import feGreen from '@themes/feGreen';
import feYellow from '@/styles/themes/feYellow';
import fePink from '@themes/fePink';
import fePurple from '@themes/fePurple';
import feRed from '@themes/feRed';

const colorModeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = {
  config: colorModeConfig,
  semanticTokens: {
    colors: {
      feRed: {
        ...feRed.colors.primary,
      },
      feBlue: {
        ...feBlue.colors.primary,
      },
      feGreen: {
        ...feGreen.colors.primary,
      },
      feYellow: {
        ...feYellow.colors.primary,
      },
      fePurple: {
        ...fePurple.colors.primary,
      },
      fePink: {
        ...fePink.colors.primary,
      },
    },
  },
  fonts: {
    heading: `'Playfair Display', 'Yeseva One', 'Times New Roman', cursive`,
    body: `'Inter', 'Arial', sans-serif`,
  },
};

const customTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Button', 'Switch', 'Slider', 'SliderTrack', 'Tabs'],
  }),
  withDefaultVariant({
    variant: 'variableFontSize',
    components: ['Text'],
  }),
  theme
);

export default customTheme;
