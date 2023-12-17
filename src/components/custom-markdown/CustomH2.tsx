import { Heading } from '@chakra-ui/react';

const CustomH2 = ({ children }: any) => {
  return (
    <Heading as="h2" fontFamily={'Inter'} fontWeight={'500'} fontSize={'2.0rem'}>
      {children}
    </Heading>
  );
};

export default CustomH2;
