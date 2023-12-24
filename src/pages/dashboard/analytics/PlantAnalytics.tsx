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
import { GeneralAnalytics as PlantAnalyticsData } from '@/data/interfaces/general-analytics';
import { Await, useLoaderData } from 'react-router-dom';
import {
  BookmarkFill,
  ChatLeftTextFill,
  EyeFill,
  HeartFill,
} from 'react-bootstrap-icons';
import LikesBarChart from '@/components/analytics-charts/LikesBarChart';
import BookmarksBarChart from '@/components/analytics-charts/BookmarksBarChart';

type DeferData = {
  plantAnalytics: Promise<AxiosResponse>;
};

const PlantAnalytics = () => {
  const dataPromise = useLoaderData() as DeferData;

  const renderPlantAnalytics = (axiosResponse: AxiosResponse) => {
    const plantAnalytics: PlantAnalyticsData = axiosResponse.data;

    if (
      !plantAnalytics.mostPopularByBookmarks &&
      !plantAnalytics.mostPopularByLikes &&
      !plantAnalytics.mostPopularByNumberOfComments &&
      !plantAnalytics.mostPopularByUniqueVisitors
    ) {
      return <Text>Немате напишано растенија! 😟</Text>;
    }

    return (
      <VStack align={'start'} w={'full'} spacing={8}>
        <VStack ps={[0, 5]} align={'start'}>
          <Text fontSize="lg" fontFamily={'Inter'} fontWeight={'500'}>
            Најпопуларно растение, според:
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
                    {plantAnalytics.mostPopularByLikes} (
                    {plantAnalytics.mostPopularByLikesCount})
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
                    {plantAnalytics.mostPopularByBookmarks} (
                    {plantAnalytics.mostPopularByBookmarksCount})
                  </strong>
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
        <VStack ps={[0, 5]} align={'start'}>
          <Text fontSize="lg" fontFamily={'Inter'} fontWeight={'500'}>
            Растенија со најголема интеракција:
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
                    {plantAnalytics.mostPopularByNumberOfComments} (
                    {plantAnalytics.mostPopularByNumberOfCommentsCount})
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
                    {plantAnalytics.mostPopularByUniqueVisitors} (
                    {plantAnalytics.mostPopularByUniqueVisitorsCount})
                  </strong>
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
        <LikesBarChart
          headerText={'Вашите растенија по број на лајкови:'}
          data={plantAnalytics.likesChartData}
        />
        <BookmarksBarChart
          headerText={'Вашите растенија по број на зачуваности:'}
          data={plantAnalytics.bookmarksChartData}
        />
      </VStack>
    );
  };

  return (
    <VStack align={'start'} spacing={4} mx={2} minW={'36em'}>
      <Heading as="h3" size="lg" fontFamily={'Inter'}>
        Статистика за вашите растенија 🌱:
      </Heading>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={dataPromise.plantAnalytics}
          errorElement={<p>Error loading plant data!</p>}
        >
          {renderPlantAnalytics}
        </Await>
      </React.Suspense>
    </VStack>
  );
};

export default PlantAnalytics;
