import DashboardApi from '@/apis/dashboard-api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import {
  Box,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { PlantAnalytics as PlantAnalyticsData } from '@/data/interfaces/plant-analytics';
import { Await, defer, useLoaderData } from 'react-router-dom';
import {
  BookmarkFill,
  ChatLeftTextFill,
  EyeFill,
  HeartFill,
} from 'react-bootstrap-icons';

type DeferData = {
  plantAnalytics: Promise<AxiosResponse>;
};

export const loader = () => {
  return defer({
    plantAnalytics: DashboardApi.getPlantAnalytics(),
  });
};

const PlantAnalytics = () => {
  const dataPromise = useLoaderData() as DeferData;

  const renderPlantAnalytics = (axiosResponse: AxiosResponse) => {
    const plantAnalytics: PlantAnalyticsData = axiosResponse.data;

    return (
      <>
        <VStack align={'start'}>
          <Text fontSize="lg" fontFamily={'Inter'}>
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
                  <strong>{plantAnalytics.mostPopularByLikes}</strong>
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
                  <strong>{plantAnalytics.mostPopularByBookmarks}</strong>
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
        <VStack align={'start'}>
          <Text fontSize="lg" fontFamily={'Inter'}>
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
                    {plantAnalytics.mostPopularByNumberOfComments}
                  </strong>
                </Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack spacing={4}>
                <HStack spacing={0}>
                  <ListIcon as={EyeFill} color="gray.600" />
                  <Text>Број на уникатни посети: </Text>
                </HStack>
                <Text>
                  <strong>{plantAnalytics.mostPopularByUniqueVisitors}</strong>
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      </>
    );
  };

  return (
    <VStack align={'start'} spacing={8} mx={2}>
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
