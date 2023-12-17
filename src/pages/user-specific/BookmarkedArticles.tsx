import { Stack, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import SearchBar from '@/components/shared/SearchBar';
import BookmarkedArticlesList from '@/components/ArticlesList/BookmarkedArticlesList';

const BookmarkedArticles = () => {
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
          <Heading>Зачувани статии</Heading>
          <SearchBar placeholderText="Пребарај статија..." />
        </Stack>
        <CustomDivider dividerColor={dividerColor} />
        <BookmarkedArticlesList />
      </VStack>
    </>
  );
};

export default BookmarkedArticles;
