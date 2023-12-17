import { HStack, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <HStack w={'full'} h={'50vh'} align={'center'} justify={'center'}>
      <Spinner size={['lg', 'xl']} position={'relative'} />
    </HStack>
  );
};

export default LoadingSpinner;
