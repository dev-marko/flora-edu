import ArticlesApi from '@/apis/blog-api';
import AuthorInfo from '@/components/AuthorInfo/AuthorInfo';
import BookmarkButton from '@/components/shared/BookmarkButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import HeartButton from '@/components/shared/HeartButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Article as ArticleData } from '@/data/interfaces/article';
import {
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useState } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import header from '../../assets/header.png';

type DeferData = {
  payload: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader(articleId: string | undefined) {
  return defer({
    payload: ArticlesApi.getArticleById(articleId),
  });
}

const Article = () => {
  const dataPromise = useLoaderData() as DeferData;

  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const [isHearted, setIsHearted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const renderArticle = (axiosResponse: AxiosResponse<ArticleData>) => {
    const article = axiosResponse.data;

    const handleHeartClick = () => {
      setIsHearted(!isHearted);
    };

    const handleBookmarkClick = () => {
      setIsBookmarked(!isBookmarked);
    };

    return (
      <>
        <Breadcrumbs />
        <VStack align={'start'} spacing={4} w={'fill'}>
          <HStack justify={'center'}>
            <Image w={'full'} src={header} />
            {/* <Box h={'300px'} w={'100vh'} bgColor={'gray.500'}></Box> */}
          </HStack>
          <Heading>{article.title}</Heading>
          <Text fontSize={'lg'}>{article.subtitle}</Text>
          <CustomDivider dividerColor={dividerColor} />
          <Text>{article.content}</Text>
          <CustomDivider dividerColor={dividerColor} />
          <HStack spacing={4}>
            <HeartButton
              tooltipLabel="Ми се допаѓа"
              handleHeartClick={handleHeartClick}
              isActive={isHearted}
            ></HeartButton>
            <BookmarkButton
              tooltipLabel="Зачувај растение"
              handleBookmarkClick={handleBookmarkClick}
              isActive={isBookmarked}
            ></BookmarkButton>
          </HStack>
          <Divider />
          <AuthorInfo author={article.author} />
          <Divider />
          <Heading as="h3" size="lg">
            Коментари
          </Heading>
          <Text>TODO: Load comments</Text>
        </VStack>
      </>
    );
  };

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Await
        errorElement={<h1>Error fetching plant details!</h1>}
        resolve={dataPromise.payload}
      >
        {renderArticle}
      </Await>
    </React.Suspense>
  );
};

export default Article;
