import { PlantCardData } from '@/data/interfaces/plant-card-data';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { Await, Link, useLoaderData } from 'react-router-dom';
import PlantCard from '../PlantCard/PlantCard';
import { AxiosResponse } from 'axios';
import React from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import BigGenericErrorMessage from '../shared/BigGenericErrorMessage';

type DeferData = {
  mostPopularPlants: Promise<AxiosResponse>;
};

const MostPopularPlants = () => {
  const dataPromise = useLoaderData() as DeferData;
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const renderMostPopularPlants = (axiosResponse: AxiosResponse) => {
    const plants = axiosResponse.data;

    const plantCards = plants.map((plant: PlantCardData) => {
      return (
        <PlantCard
          key={plant.id}
          id={plant.id}
          name={plant.name}
          description={plant.description}
          thumbnailImageUrl={plant.thumbnailImageUrl}
          likeCount={plant.likeCount}
          isLiked={plant.isLiked}
          isBookmarked={plant.isBookmarked}
          withConfirmationDialog={false}
        />
      );
    });

    return plantCards;
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
        align={'center'}
      >
        <Heading textAlign={{ base: 'center' }}>Најпопуларни растенија</Heading>
        <Link to="plants">
          <Button>Сите растенија</Button>
        </Link>
      </Stack>
      <Divider borderColor={dividerColor} borderRadius={'lg'} />
      <Stack
        direction={['column', 'row']}
        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
        justify={'center'}
        align={'center'}
      >
        <React.Suspense fallback={<LoadingSpinner />}>
          <Await
            resolve={dataPromise.mostPopularPlants}
            errorElement={<BigGenericErrorMessage />}
          >
            {renderMostPopularPlants}
          </Await>
        </React.Suspense>
      </Stack>
    </Flex>
  );
};

export default MostPopularPlants;
