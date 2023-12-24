import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import PlantCard from '../PlantCard/PlantCard';
import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import PlantsApi from '@/apis/plants-api';
import { AxiosResponse } from 'axios';
import { PlantCardData } from '@/data/interfaces/plant-card-data';
import LoadingSpinner from '../shared/LoadingSpinner';
import { FeatureEntities } from '@/data/enums/feature-entities';
import Pagination from '../shared/Pagination';
import { PagedList } from '@/data/interfaces/paged-list';
import BigGenericErrorMessage from '../shared/BigGenericErrorMessage';

type DeferData = {
  plants: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ request }: any, entity?: FeatureEntities) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm');
  const typeTerm = url.searchParams.get('type');

  let page = 0;
  let size = 0;

  if (url.searchParams.get('page') !== null) {
    page = parseInt(url.searchParams.get('page')!);
  }

  if (url.searchParams.get('page') !== null) {
    size = parseInt(url.searchParams.get('size')!);
  }

  const requestDto: PlantsRequest = {
    searchTerm: searchTerm ?? '',
    type: typeTerm ?? '',
    page: page !== 0 ? page : 1,
    size: size !== 0 ? size : 8,
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

const renderPlantCards = (axiosResponse: AxiosResponse) => {
  const plants = axiosResponse.data.items;

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

const renderPaginationArray = (axiosResponse: AxiosResponse) => {
  const pagedList: PagedList<PlantCardData> = axiosResponse.data;

  return <Pagination pagedListData={pagedList} />;
};

const PlantsList = () => {
  const dataPromise = useLoaderData() as DeferData;

  return (
    <>
      <Flex w={'100%'} justify={['center', 'start']} flexWrap={'wrap'}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Await
            resolve={dataPromise.plants}
            errorElement={<BigGenericErrorMessage />}
          >
            {renderPlantCards}
          </Await>
        </React.Suspense>
      </Flex>
      <VStack w={'100%'}>
        <React.Suspense>
          <Await resolve={dataPromise.plants} errorElement={<></>}>
            {renderPaginationArray}
          </Await>
        </React.Suspense>
      </VStack>
    </>
  );
};

export default PlantsList;
