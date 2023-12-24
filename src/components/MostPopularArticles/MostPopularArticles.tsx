import {
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import ArticleCard from '../ArticleCard/ArticleCard';
import { Await, Link, useLoaderData } from 'react-router-dom';
import React from 'react';
import { ArticleCardData } from '@/data/interfaces/article-card-data';
import { AxiosResponse } from 'axios';
import LoadingSpinner from '../shared/LoadingSpinner';
import BigGenericErrorMessage from '../shared/BigGenericErrorMessage';

type DeferData = {
  mostPopularArticles: Promise<AxiosResponse>;
};

const MostPopularArticles = () => {
  const dataPromise = useLoaderData() as DeferData;

  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const renderMostPopularArticles = (axiosResponse: AxiosResponse) => {
    const articles = axiosResponse.data;

    const articleCards = articles.map((article: ArticleCardData) => {
      return (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          shortDescription={article.shortDescription}
          headerImageUrl={article.headerImageUrl}
          author={article.author}
          createdAt={article.createdAt}
          isBookmarked={article.isBookmarked}
          withConfirmationDialog={false}
        />
      );
    });

    return articleCards;
  };

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
        <Link to="blog">
          <Button>Сите статии</Button>
        </Link>
      </Stack>
      <Divider borderColor={dividerColor} borderRadius={'lg'} />
      <Stack
        direction={'column'}
        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
        justify={'center'}
      >
        <React.Suspense fallback={<LoadingSpinner />}>
          <Await
            resolve={dataPromise.mostPopularArticles}
            errorElement={<BigGenericErrorMessage />}
          >
            {renderMostPopularArticles}
          </Await>
        </React.Suspense>
      </Stack>
    </Flex>
  );
};

export default MostPopularArticles;
