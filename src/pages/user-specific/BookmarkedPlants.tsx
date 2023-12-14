import PlantsList from '@/components/PlantsList/PlantsList';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import SearchBar from '@/components/shared/SearchBar';
import { Stack, VStack, Heading, useColorModeValue } from '@chakra-ui/react';

const BookmarkedPlants = () => {
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');
  return (
    <VStack align={'start'} mt={{ base: 0, md: 5 }}>
      <Breadcrumbs />
      <Stack w={'full'} justify={'space-between'} direction={['column', 'row']}>
        <Heading>Зачувани растенија</Heading>
        <SearchBar />
      </Stack>
      <CustomDivider dividerColor={dividerColor} />
      <PlantsList />
    </VStack>
  );
};

export default BookmarkedPlants;
