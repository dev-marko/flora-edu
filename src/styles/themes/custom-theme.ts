import {
  ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps,
  withDefaultSize,
  withDefaultVariant,
} from '@chakra-ui/react';

import feBlue from '@themes/feBlue';
import feGreen from '@themes/feGreen';
import feOrange from '@themes/feOrange';
import fePink from '@themes/fePink';
import fePurple from '@themes/fePurple';
import feRed from '@themes/feRed';

import '@fontsource/yeseva-one/400.css';
import '@fontsource/inter/500.css';
import useLocalStorage from '@/hooks/useLocalStorage';
import { FONT_SIZE_KEY } from '@/constants/theme-constants';

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
      feOrange: {
        ...feOrange.colors.primary,
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
    heading: `'Yeseva One', 'Times New Roman', cursive`,
    body: `'Inter', 'Arial', sans-serif`,
  },
};

const customTheme = extendTheme(
  //This will set the default colorScheme for all buttons as `primary`
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Button', 'Switch', 'Slider', 'SliderTrack'],
  }),
  // withDefaultSize({
  //   size: '2xl',
  //   components: ['Heading'],
  // }),
  withDefaultVariant({
    variant: 'variableFontSize',
    components: ['Text', 'Heading'],
  }),
  theme
);

export default customTheme;
