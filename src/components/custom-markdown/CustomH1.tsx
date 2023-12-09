import { Heading } from '@chakra-ui/react';

const CustomH1 = ({ children }: any) => {
  return (
    <Heading as="h1" fontFamily={'Inter'} fontWeight={'500'} fontSize={'2.5rem'}>
      {children}
    </Heading>
  );
};

export default CustomH1;
