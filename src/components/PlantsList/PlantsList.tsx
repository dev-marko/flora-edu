import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import PlantCard from '../PlantCard/PlantCard';
import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import PlantsApi from '@/apis/plants-api';
import { AxiosResponse } from 'axios';
import { PlantCardData } from '@/data/interfaces/plant-card-data';
import LoadingSpinner from '../shared/LoadingSpinner';
import { FeatureEntities } from '@/data/enums/feature-entities';

type DeferData = {
  plants: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader(entity?: FeatureEntities) {
  const requestDto: PlantsRequest = {
    page: 1,
    size: 5,
  };

  let apiCall: Promise<AxiosResponse>;
  switch (entity) {
    case FeatureEntities.BookmarkedPlants:
      apiCall = PlantsApi.getBookmarkedPlants(requestDto);
      break;
    default:
      apiCall = PlantsApi.getPlants(requestDto);
  }

  return defer({
    plants: apiCall,
  });
}

function renderPlants(axiosResponse: AxiosResponse) {
  const plants = axiosResponse.data.items;

  const plantCards = plants.map((plant: PlantCardData) => {
    return (
      <PlantCard
        key={plant.id}
        id={plant.id}
        name={plant.name}
        description={plant.description}
        likeCount={plant.likeCount}
        isLiked={plant.isLiked}
        isBookmarked={plant.isBookmarked}
      />
    );
  });

  return plantCards;
}

const PlantsList = () => {
  const dataPromise = useLoaderData() as DeferData;

  return (
    <Flex w={'100%'} justify={'space-around'} flexWrap={'wrap'}>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={dataPromise.plants}
          errorElement={<p>Error loading plants data!</p>}
        >
          {renderPlants}
        </Await>
      </React.Suspense>
    </Flex>
  );
};

export default PlantsList;
