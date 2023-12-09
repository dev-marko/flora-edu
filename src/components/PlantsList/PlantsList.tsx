import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import PlantCard from '../PlantCard/PlantCard';
import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import PlantsApi from '@/apis/plants-api';
import { AxiosResponse } from 'axios';
import { PlantCardData } from '@/data/interfaces/plant-card-data';
import LoadingSpinner from '../shared/LoadingSpinner';

type DeferData = {
  plants: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  const requestDto: PlantsRequest = {
    page: 1,
    size: 5,
  };

  return defer({
    plants: PlantsApi.getPlants(requestDto),
  });
}

function renderPlants(axiosResponse: AxiosResponse) {
  const plants = axiosResponse.data.items;

  const plantCards = plants.map((plant: PlantCardData) => {
    return (
      <PlantCard
        id={plant.id}
        name={plant.name}
        description={plant.description}
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
