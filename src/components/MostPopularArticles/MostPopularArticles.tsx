import {
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import PopularArticleCard from '../PopularArticleCard/PopularArticleCard';
import articles from '../../assets/data/blog-articles.json';

const MostPopularArticles = () => {
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  return (
    <Flex flexDir={'column'}>
      <Stack
        direction={{ base: 'column', sm: 'column', md: 'row' }}
        flexWrap={'wrap'}
        px={8}
        py={5}
        justify={'space-between'}
        spacing={{ base: 5 }}
      >
        <Heading textAlign={{ base: 'center' }}>
          Популарни статии од нашиот блог
        </Heading>
        <Button>Сите статии</Button>
      </Stack>
      <Divider borderColor={dividerColor} borderRadius={'lg'} />
      <Stack
        direction={'column'}
        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
        justify={'center'}
      >
        {articles.map((article) => (
          <PopularArticleCard {...article} />
        ))}
      </Stack>
    </Flex>
  );
};

export default MostPopularArticles;
