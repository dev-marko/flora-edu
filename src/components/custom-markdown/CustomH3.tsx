import { Heading } from '@chakra-ui/react';

const CustomH3 = ({ children }: any) => {
  return (
    <Heading as="h3" fontFamily={'Inter'} fontWeight={'500'} fontSize={'1.75rem'}>
      {children}
    </Heading>
  );
};

export default CustomH3;
