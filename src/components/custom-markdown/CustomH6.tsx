import { Heading } from '@chakra-ui/react';

const CustomH6 = ({ children }: any) => {
  return (
    <Heading as="h6" fontFamily={'Inter'} fontWeight={'500'} fontSize={'1rem'}>
      {children}
    </Heading>
  );
};

export default CustomH6;
