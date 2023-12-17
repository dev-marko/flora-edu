import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom';

import {
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
  useColorModeValue,
  useBreakpointValue,
  Textarea,
  IconButton,
  useToast,
} from '@chakra-ui/react';

import PlantsApi from '@/apis/plants-api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { PlantDetails as PlantDetailsData } from '@/data/interfaces/plant-details';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import header from '../../assets/header.png';
import CustomDivider from '@/components/shared/CustomDivider';
import AuthorInfo from '@/components/AuthorInfo/AuthorInfo';
import Comment from '@/components/shared/Comment';
import { Send } from 'react-bootstrap-icons';
import { NewPlantComment } from '@/data/interfaces/new-plant-comment';
import PlantDetailsHeader from './PlantDetailsHeader';
import { FeatureEntities } from '@/data/enums/feature-entities';
import ScrollToTop from '@/components/shared/ScrollToTop';

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
  const revalidator = useRevalidator();
  const toast = useToast();

  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const [commentContent, setCommentContent] = useState('');

  const tabsOrientation: 'horizontal' | 'vertical' | undefined =
    useBreakpointValue({
      base: 'vertical',
      md: 'horizontal',
    });

  const handleCommentOnChange = (value: string) => {
    setCommentContent(value);
  };

  const renderPlantDetails = (
    axiosResponse: AxiosResponse<PlantDetailsData>
  ) => {
    const plantDetails = axiosResponse.data;

    const handleCommentSend = () => {
      const newPlantComment: NewPlantComment = {
        plantId: plantDetails.id,
        content: commentContent,
      };

      setCommentContent('');
      PlantsApi.addNewComment(newPlantComment)
        .then(() => {
          revalidator.revalidate();
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: 'Настаната грешка.',
            description: 'Ве молиме обидете се повторно.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    };

    return (
      <>
        <ScrollToTop />
        <Breadcrumbs />
        <Heading>{plantDetails.name}</Heading>
        <CustomDivider dividerColor={dividerColor} />
        <VStack align={'start'} spacing={4} w={'fill'}>
          <PlantDetailsHeader
            id={plantDetails.id}
            headerImage={header}
            isLiked={plantDetails.isLiked}
            likeCount={plantDetails.likeCount}
            isBookmarked={plantDetails.isBookmarked}
          />
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
          <AuthorInfo author={plantDetails.author} />
          <Divider />
          <Heading as="h3" size="lg">
            ({plantDetails.comments.length}) Коментари
          </Heading>
          <CustomDivider dividerColor={dividerColor} />
          <HStack w={'full'} align={'start'} mb={5}>
            <Textarea
              placeholder="Остави коментар..."
              focusBorderColor={'primary.300'}
              onChange={(event) => handleCommentOnChange(event.target.value)}
            />
            <IconButton
              hidden={!commentContent}
              icon={<Send />}
              isRound={true}
              variant="outline"
              colorScheme={'gray'}
              aria-label={'Прати коментар'}
              onClick={handleCommentSend}
            />
          </HStack>
          <VStack w={'full'} spacing={8} mb={5}>
            {plantDetails.comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                user={comment.user}
                content={comment.content}
                date={comment.createdAt}
                isLiked={comment.isLiked}
                likeCount={comment.likeCount}
                featureEntity={FeatureEntities.PlantComment}
              />
            ))}
          </VStack>
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
