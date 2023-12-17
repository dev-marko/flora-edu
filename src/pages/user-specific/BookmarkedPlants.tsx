import BookmarkedPlantsList from '@/components/PlantsList/BookmarkedPlantsList';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import SearchBar from '@/components/shared/SearchBar';
import { Stack, VStack, Heading, useColorModeValue } from '@chakra-ui/react';

const BookmarkedPlants = () => {
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');
  return (
    <>
      <Breadcrumbs />
      <VStack align={'start'} my={5}>
        <Stack
          w={'full'}
          justify={'space-between'}
          direction={['column', 'row']}
        >
          <Heading>Зачувани растенија</Heading>
          <SearchBar placeholderText="Пребарај зачувано растение..." />
        </Stack>
        <CustomDivider dividerColor={dividerColor} />
        <BookmarkedPlantsList />
      </VStack>
    </>
  );
};

export default BookmarkedPlants;
