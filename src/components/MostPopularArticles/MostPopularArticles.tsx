import {
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import ArticleCard from '../ArticleCard/ArticleCard';
import articles from '../../assets/data/blog-articles.json';
import { Link } from 'react-router-dom';

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
        <Button>
          <Link to="blog">Сите статии</Link>
        </Button>
      </Stack>
      <Divider borderColor={dividerColor} borderRadius={'lg'} />
      <Stack
        direction={'column'}
        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
        justify={'center'}
      >
        {articles.map((article) => (
          <ArticleCard {...article} />
        ))}
      </Stack>
    </Flex>
  );
};

export default MostPopularArticles;
