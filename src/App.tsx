import { useState } from 'react';
import {
  Text,
  Heading,
  Button,
  ChakraProvider,
  Container,
  extendTheme,
  useDisclosure,
} from '@chakra-ui/react';

import customTheme from '@/styles/themes/custom-theme';
import feGreen from '@themes/feGreen';
import { COLOR_THEME_KEY, FONT_SIZE_KEY } from '@/constants/theme-constants';
import DisplayPreferences from '@components/DisplayPreferences/DisplayPreferences';
import useLocalStorage from '@hooks/useLocalStorage';

function App() {
  const [colorTheme] = useLocalStorage(COLOR_THEME_KEY, feGreen);
  const [fontSize] = useLocalStorage(FONT_SIZE_KEY, {
    numberValue: 40,
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

  const {
    isOpen: isDisplayOpen,
    onOpen: onDisplayOpen,
    onClose: onDisplayClose,
  } = useDisclosure();

  return (
    <ChakraProvider theme={mergedTheme}>
      <Container>
        <Heading>Testing the Display Preferences modal</Heading>
        <Button onClick={onDisplayOpen}>Open Modal</Button>
        <Text>Normal body text</Text>
        <DisplayPreferences
          openModalDisclosure={isDisplayOpen}
          closeModalDisclosure={onDisplayClose}
        ></DisplayPreferences>
      </Container>
    </ChakraProvider>
  );
}

export default App;
