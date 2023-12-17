import {
  VStack,
  Stack,
  HStack,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';

import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import PlantsList from '@/components/PlantsList/PlantsList';
import SearchBar from '@/components/shared/SearchBar';
import PlantTypeFilter from './SelectComp';
import CustomDivider from '@/components/shared/CustomDivider';

const Plants = () => {
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  return (
    <VStack align={'center'} my={5}>
      <HStack w={'full'} align={'start'}>
        <Breadcrumbs />
      </HStack>
      <Stack
        w={'full'}
        justify={'space-between'}
        direction={['column', 'row']}
        spacing={4}
      >
        <Heading>Растенија</Heading>
        <Stack direction={['column', 'row']}>
          <PlantTypeFilter />
          <SearchBar placeholderText="Пребарај растение..." />
        </Stack>
      </Stack>
      <CustomDivider dividerColor={dividerColor} />
      <VStack ps={[0, 8]}>
        <PlantsList />
      </VStack>
    </VStack>
  );
};

export default Plants;
