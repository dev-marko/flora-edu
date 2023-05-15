import { ChakraProvider } from "@chakra-ui/react";

import { Text, Heading, Button } from "@chakra-ui/react";

import "./App.css";
import theme from "./styles/theme";

function App() {

  const changeLocalStorageValue = (value: string) => {
    window.localStorage.setItem("userTheme", value);
  }

  return (
    <ChakraProvider theme={theme}>
      <Heading size="4xl">ФлораЕду</Heading>
      <Text>Test paragraph body font</Text>
      <Button colorScheme={"fePurple"} onClick={() => changeLocalStorageValue("fePurple")}>Purple</Button>
      <Button colorScheme={"feGreen"} onClick={() => changeLocalStorageValue("feGreen")}>Green</Button>
      <Button variant="feButtonPrimary">Test 1</Button>
      <Button>Test 2</Button>
      <Button>Test 3</Button>
      <Button>Test 4</Button>
    </ChakraProvider>
  );
}

export default App;
