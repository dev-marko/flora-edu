import { Heading } from '@chakra-ui/react';

const CustomH5 = ({ children }: any) => {
  return (
    <Heading as="h5" fontFamily={'Inter'} fontWeight={'500'} fontSize={'1.25rem'}>
      {children}
    </Heading>
  );
};

export default CustomH5;
