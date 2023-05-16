import { ColorHues } from "@chakra-ui/react";

interface AppTheme {
  name: string;
  id: string;
  colors: {
    primary: ColorHues;
  };
}

export default AppTheme;
