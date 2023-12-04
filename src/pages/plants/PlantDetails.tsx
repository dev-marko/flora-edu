import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { Await, defer, useLoaderData } from 'react-router-dom';

import {
  Avatar,
  Box,
  Divider,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Stack,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

import PlantsApi from '@/apis/plants-api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { PlantDetails as PlantDetailsData } from '@/data/interfaces/plant-details';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import HeartButton from '@/components/shared/HeartButton';
import BookmarkButton from '@/components/shared/BookmarkButton';
import placeholder from '../../assets/placeholder.png';
import CustomDivider from '@/components/shared/CustomDivider';

type DeferData = {
  payload: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader(plantId: string | undefined) {
  return defer({
    payload: PlantsApi.getPlantById(plantId),
  });
}

const PlantDetails = () => {
  const dataPromise = useLoaderData() as DeferData;

  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const [isHearted, setIsHearted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const tabsOrientation: 'horizontal' | 'vertical' | undefined =
    useBreakpointValue({
      base: 'vertical',
      md: 'horizontal',
    });

  const renderPlantDetails = (
    axiosResponse: AxiosResponse<PlantDetailsData>
  ) => {
    const plantDetails = axiosResponse.data;

    const handleHeartClick = () => {
      setIsHearted(!isHearted);
    };

    const handleBookmarkClick = () => {
      setIsBookmarked(!isBookmarked);
    };

    return (
      <>
        <Breadcrumbs />
        <Heading>{plantDetails.name}</Heading>
        <CustomDivider dividerColor={dividerColor} />
        <VStack align={'start'} spacing={4} w={'fill'}>
          <HStack justify={'center'}>
            <Image w={'50vh'} src={placeholder} />
            {/* <Box h={'300px'} w={'100vh'} bgColor={'gray.500'}></Box> */}
          </HStack>
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
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Tabs
              isFitted
              variant="soft-rounded"
              orientation={tabsOrientation}
              flexDir={'column'}
            >
              <TabList>
                <Tab>Опис</Tab>
                <Tab>Предуслови</Tab>
                <Tab>Садење</Tab>
                <Tab>Одржување</Tab>
              </TabList>
              <TabPanels mt={3}>
                <TabPanel px={0}>
                  <Heading>Опис</Heading>
                  <CustomDivider dividerColor={dividerColor} />
                  <Text>{plantDetails.description}</Text>
                </TabPanel>
                <TabPanel px={0}>
                  <Heading>Предуслови</Heading>
                  <CustomDivider dividerColor={dividerColor} />
                  <Text>{plantDetails.predispositions}</Text>
                </TabPanel>
                <TabPanel px={0}>
                  <Heading>Садење</Heading>
                  <CustomDivider dividerColor={dividerColor} />
                  <Text>{plantDetails.planting}</Text>
                </TabPanel>
                <TabPanel px={0}>
                  <Heading>Одржување</Heading>
                  <CustomDivider dividerColor={dividerColor} />
                  <Text>{plantDetails.maintenance}</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
          <Divider />
          <HStack spacing={8}>
            <Avatar />
            <VStack align={'start'}>
              <Text fontWeight={'semibold'}>
                {plantDetails.author.firstName} {plantDetails.author.lastName}
              </Text>
              <Text>{plantDetails.author.authorBiography}</Text>
            </VStack>
          </HStack>
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
        {renderPlantDetails}
      </Await>
    </React.Suspense>
  );
};

export default PlantDetails;
