import Lottie from 'lottie-react';
import { Box, Container, Text, VStack } from '@chakra-ui/react';
import forbiddenAnimation from '../../assets/lottie/403-forbidden.json';

const ErrorPage403 = () => {
  return (
    <Container maxW={'container.xl'}>
      <VStack w={'full'}>
        <Box w={['20em', '30em']}>
          <Lottie animationData={forbiddenAnimation} loop={true} />
        </Box>
        <Text fontSize={'2em'} fontWeight={'semibold'} textAlign={'center'}>
          Грешка 403 - Несоодветна авторизација! Вратете се назад.
        </Text>
      </VStack>
    </Container>
  );
};

export default ErrorPage403;
