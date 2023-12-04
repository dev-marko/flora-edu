import { Divider } from '@chakra-ui/react';

type CustomDividerProps = {
  dividerColor: string;
};

const CustomDivider = ({ dividerColor }: CustomDividerProps) => {
  return <Divider my={3} borderColor={dividerColor} borderRadius={'lg'} />;
};

export default CustomDivider;
