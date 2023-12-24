import React from 'react';
import { AxiosResponse } from 'axios';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Flex, VStack } from '@chakra-ui/react';
import ArticlesApi from '@/apis/blog-api';
import { ArticlesRequest } from '@/data/request-interfaces/articles-request';
import { ArticleCardData } from '@/data/interfaces/article-card-data';
import LoadingSpinner from '../shared/LoadingSpinner';
import ArticleCard from '../ArticleCard/ArticleCard';
import { FeatureEntities } from '@/data/enums/feature-entities';
import { PagedList } from '@/data/interfaces/paged-list';
import Pagination from '../shared/Pagination';
import BigGenericErrorMessage from '../shared/BigGenericErrorMessage';

type DeferData = {
  articles: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ request }: any, entity?: FeatureEntities) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm');
  let page = 0;
  let size = 0;

  if (url.searchParams.get('page') !== null) {
    page = parseInt(url.searchParams.get('page')!);
  }

  if (url.searchParams.get('page') !== null) {
    size = parseInt(url.searchParams.get('size')!);
  }

  const requestDto: ArticlesRequest = {
    page: page !== 0 ? page : 1,
    size: size !== 0 ? size : 8,
    searchTerm: searchTerm ?? '',
  };

  let apiCall: Promise<AxiosResponse>;
  switch (entity) {
    case FeatureEntities.BookmarkedArticles:
      apiCall = ArticlesApi.getBookmarkedArticles(requestDto);
      break;
    default:
      apiCall = ArticlesApi.getArticles(requestDto);
  }

  return defer({
    articles: apiCall,
  });
}

const renderArticles = (axiosResponse: AxiosResponse) => {
  const articles = axiosResponse.data.items;

  const articleCards = articles.map((article: ArticleCardData) => {
    return (
      <ArticleCard
        key={article.id}
        id={article.id}
        title={article.title}
        shortDescription={article.shortDescription}
        headerImageUrl={article.headerImageUrl}
        author={article.author}
        createdAt={article.createdAt}
        isBookmarked={article.isBookmarked}
        withConfirmationDialog={true}
      />
    );
  });

  return articleCards;
};

const renderPaginationArray = (axiosResponse: AxiosResponse) => {
  const pagedList: PagedList<ArticleCardData> = axiosResponse.data;

  return <Pagination pagedListData={pagedList} />;
};

const BookmarkedArticlesList = () => {
  const dataPromise = useLoaderData() as DeferData;

  return (
    <>
      <Flex w={'100%'} justify={'space-around'} flexWrap={'wrap'}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Await
            resolve={dataPromise.articles}
            errorElement={<BigGenericErrorMessage />}
          >
            {renderArticles}
          </Await>
        </React.Suspense>
      </Flex>
      <VStack w={'100%'}>
        <React.Suspense>
          <Await resolve={dataPromise.articles} errorElement={<></>}>
            {renderPaginationArray}
          </Await>
        </React.Suspense>
      </VStack>
    </>
  );
};

export default BookmarkedArticlesList;
