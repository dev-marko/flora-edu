import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Text, Heading, Button, VStack } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

import "./App.css";

import theme from "@themes/theme";

import feGreen from "@themes/feGreen";
import feOrange from "@themes/feOrange";
import fePurple from "@themes/fePurple";

import { useState } from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

function App() {
  const colorThemes = [feGreen, feOrange, fePurple];
  const [activeColorTheme, activateColorTheme] = useState(feGreen);
  // Merge the active color theme's colors into our base theme:
  const mergedTheme = extendTheme(theme, { colors: activeColorTheme.colors });

  return (
    <ChakraProvider theme={mergedTheme}>
      <Heading size="4xl">ФлораЕду</Heading>
      <Text>Test paragraph body font</Text>
      <Button>Test 1</Button>
      <Button>Test 2</Button>
      <Button>Test 3</Button>
      <Button>Test 4</Button>

      <Popover>
        <PopoverTrigger>
          <Button size="sm">Change Theme</Button>
        </PopoverTrigger>
        <PopoverContent w="150px">
          <PopoverArrow />
          <PopoverBody>
            <VStack>
              {/* Map over each colorTheme and add a button to activate it */}
              {colorThemes.map((colorTheme) => (
                <Button
                  variant="link"
                  key={colorTheme.id}
                  onClick={() => activateColorTheme(colorTheme)}
                >
                  {colorTheme.name}
                </Button>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Card bg="fePrimaryContainer">
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </ChakraProvider>
  );
}

export default App;
