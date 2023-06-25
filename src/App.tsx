import { useState } from 'react';

import {
  ChakraProvider,
  Container,
  extendTheme,
  useDisclosure,
} from '@chakra-ui/react';

import DisplayPreferences from '@components/DisplayPreferences/DisplayPreferences';
import { COLOR_THEME_KEY, FONT_SIZE_KEY } from '@/constants/theme-constants';
import useLocalStorage from '@hooks/useLocalStorage';
import { FontSizeSliderValue } from '@/interfaces/font-size-slider-value';

import customTheme from '@/styles/themes/custom-theme';
import feGreen from '@/styles/themes/feGreen';
import AppTheme from '@/styles/themes/interface/appTheme';

import Navbar from '@components/Navbar/Navbar';
import Footer from '@components/Footer/Footer';

function App() {
  const [colorTheme] = useLocalStorage(COLOR_THEME_KEY, feGreen);
  const [fontSize, setFontSize] = useLocalStorage(FONT_SIZE_KEY, {
    numericValue: 25,
    stringValue: 'md',
  });
  const [activeColorTheme, setActiveColorTheme] = useState(colorTheme);

  const setColorThemeCallback = (value: AppTheme) => {
    setActiveColorTheme(value);
  };

  const setFontSizeCallback = (value: FontSizeSliderValue) => {
    setFontSize(value);
  };

  // Merge the active color theme's colors into our base theme:
  const mergedTheme = extendTheme(customTheme, {
    colors: activeColorTheme.colors,
    components: {
      Text: {
        variants: {
          variableFontSize: {
            fontSize: fontSize.stringValue,
          },
        },
      },
    },
  });

  const {
    isOpen: isDisplayOpen,
    onOpen: onDisplayOpen,
    onClose: onDisplayClose,
  } = useDisclosure();

  return (
    <ChakraProvider theme={mergedTheme}>
      <Container maxW={'container.xl'}>
        <Navbar onOpenDisplayPreferencesCallback={onDisplayOpen}></Navbar>
        <DisplayPreferences
          openModalDisclosure={isDisplayOpen}
          closeModalDisclosure={onDisplayClose}
          onColorModeChange={setColorThemeCallback}
          onFontSizeChange={setFontSizeCallback}
        ></DisplayPreferences>
      </Container>
      <Footer></Footer>
    </ChakraProvider>
  );
}

export default App;
