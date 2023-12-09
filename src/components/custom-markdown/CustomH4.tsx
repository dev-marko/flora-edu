import { Heading } from '@chakra-ui/react';

const CustomH4 = ({ children }: any) => {
  return (
    <Heading as="h4" fontFamily={'Inter'} fontWeight={'500'} fontSize={'1.5rem'}>
      {children}
    </Heading>
  );
};

export default CustomH4;
