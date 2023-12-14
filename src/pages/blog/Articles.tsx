import { Stack, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import SearchBar from '@/components/shared/SearchBar';

type ArticlesProps = {
  pageHeading: string;
};

const Articles = ({ pageHeading }: ArticlesProps) => {
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');
  return (
    <>
      <Breadcrumbs />
      <VStack align={'start'} mt={{ base: 0, md: 5 }}>
        <Stack
          w={'full'}
          justify={'space-between'}
          direction={['column', 'row']}
        >
          <Heading>{pageHeading}</Heading>
          <SearchBar />
        </Stack>
        <CustomDivider dividerColor={dividerColor} />
        <ArticlesList />
      </VStack>
    </>
  );
};

export default Articles;
