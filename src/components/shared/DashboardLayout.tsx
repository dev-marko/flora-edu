import { useState } from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';
import { COLOR_THEME_KEY, FONT_SIZE_KEY } from '@constants/theme-constants';

import customTheme from '@/styles/themes/custom-theme';
import feGreen from '@/styles/themes/feGreen';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [colorTheme] = useLocalStorage(COLOR_THEME_KEY, feGreen);
  const [fontSize] = useLocalStorage(FONT_SIZE_KEY, {
    numericValue: 25,
    stringValue: 'md',
  });
  const [activeColorTheme] = useState(colorTheme);

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

  return (
    <ChakraProvider theme={mergedTheme}>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </ChakraProvider>
  );
};

export default DashboardLayout;
