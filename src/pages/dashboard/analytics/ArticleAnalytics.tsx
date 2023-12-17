import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { GeneralAnalytics as ArticleAnalyticsData } from '@/data/interfaces/general-analytics';
import { Await, useLoaderData } from 'react-router-dom';
import {
  BookmarkFill,
  ChatLeftTextFill,
  EyeFill,
  HeartFill,
} from 'react-bootstrap-icons';

type DeferData = {
  articleAnalytics: Promise<AxiosResponse>;
};

const ArticleAnalytics = () => {
  const dataPromise = useLoaderData() as DeferData;

  const renderArticleAnalytics = (axiosResponse: AxiosResponse) => {
    const articleAnalytics: ArticleAnalyticsData = axiosResponse.data;

    if (
      !articleAnalytics.mostPopularByBookmarks &&
      !articleAnalytics.mostPopularByLikes &&
      !articleAnalytics.mostPopularByNumberOfComments &&
      !articleAnalytics.mostPopularByUniqueVisitors
    ) {
      return <Text>Немате напишано статија! 😟</Text>;
    }

    return (
      <>
        <VStack align={'start'}>
          <Text fontSize="lg" fontFamily={'Inter'}>
            Најпопуларна статија, според:
          </Text>
          <List ps={4}>
            <ListItem>
              <HStack spacing={4}>
                <HStack spacing={0}>
                  <ListIcon as={HeartFill} color="red" />
                  <Text>Број на лајкови: </Text>
                </HStack>
                <Text>
                  <strong>
                    {articleAnalytics.mostPopularByLikes} (
                    {articleAnalytics.mostPopularByLikesCount})
                  </strong>
                </Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack spacing={4}>
                <HStack spacing={0}>
                  <ListIcon as={BookmarkFill} color="yellow.500" />
                  <Text>Број на зачуваности: </Text>
                </HStack>
                <Text>
                  <strong>
                    {articleAnalytics.mostPopularByBookmarks} (
                    {articleAnalytics.mostPopularByBookmarksCount})
                  </strong>
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
        <VStack align={'start'}>
          <Text fontSize="lg" fontFamily={'Inter'}>
            Статија со најголема интеракција:
          </Text>
          <List ps={5}>
            <ListItem>
              <HStack spacing={4}>
                <HStack spacing={0}>
                  <ListIcon as={ChatLeftTextFill} color="blue.300" />
                  <Text>Број на коментари: </Text>
                </HStack>
                <Text>
                  <strong>
                    {articleAnalytics.mostPopularByNumberOfComments} (
                    {articleAnalytics.mostPopularByNumberOfCommentsCount})
                  </strong>
                </Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack spacing={4}>
                <HStack spacing={0}>
                  <ListIcon as={EyeFill} color="gray.600" />
                  <Text>Број на уникатни прегледи: </Text>
                </HStack>
                <Text>
                  <strong>
                    {articleAnalytics.mostPopularByUniqueVisitors} (
                    {articleAnalytics.mostPopularByUniqueVisitorsCount})
                  </strong>
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      </>
    );
  };

  return (
    <VStack align={'start'} spacing={4} mx={2}>
      <Heading as="h3" size="lg" fontFamily={'Inter'}>
        Статистика за вашите статии 📝:
      </Heading>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={dataPromise.articleAnalytics}
          errorElement={<p>Error loading plant data!</p>}
        >
          {renderArticleAnalytics}
        </Await>
      </React.Suspense>
    </VStack>
  );
};

export default ArticleAnalytics;
