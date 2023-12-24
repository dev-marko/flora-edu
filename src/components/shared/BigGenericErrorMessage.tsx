import Lottie from 'lottie-react';
import { Box, Container, VStack, Text } from '@chakra-ui/react';
import somethingWentWrongAnimation from '../../assets/lottie/something-went-wrong.json';

const BigGenericErrorMessage = () => {
  return (
    <Container maxW={'container.xl'}>
      <VStack w={'full'}>
        <Box w={['20em', '30em']}>
          <Lottie animationData={somethingWentWrongAnimation} loop={true} />
        </Box>
        <Text mt={3} fontSize={'1.5em'} textAlign={'center'}>
          Упс! Настаната грешка. Обидете се повторно 😓
        </Text>
      </VStack>
    </Container>
  );
};

export default BigGenericErrorMessage;
