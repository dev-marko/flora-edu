import Lottie from 'lottie-react';
import { Box, Container, Text, VStack } from '@chakra-ui/react';
import notFoundAnimation from '../../assets/lottie/404-not-found.json';

const ErrorPage404 = () => {
  return (
    <Container maxW={'container.xl'}>
      <VStack w={'full'}>
        <Box w={['20em', '30em']}>
          <Lottie animationData={notFoundAnimation} loop={true} />
        </Box>
        <Text fontSize={'2em'} fontWeight={'semibold'} textAlign={'center'}>
          Грешка 404 - Бараниот ресурс не е пронајден.
        </Text>
      </VStack>
    </Container>
  );
};

export default ErrorPage404;
