import React from 'react';
import { AxiosResponse } from 'axios';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import ArticlesApi from '@/apis/blog-api';
import { ArticlesRequest } from '@/data/request-interfaces/articles-request';
import { ArticleCardData } from '@/data/interfaces/article-card-data';
import LoadingSpinner from '../shared/LoadingSpinner';
import ArticleCard from '../ArticleCard/ArticleCard';

type DeferData = {
  articles: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ request }: any) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm');

  const requestDto: ArticlesRequest = {
    page: 1,
    size: 5,
    searchTerm: searchTerm ?? '',
  };

  return defer({
    articles: ArticlesApi.getArticles(requestDto),
  });
}

function renderArticles(axiosResponse: AxiosResponse) {
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
        isLiked={article.isLiked}
        isBookmarked={article.isBookmarked}
      />
    );
  });

  return articleCards;
}

const ArticlesList = () => {
  const dataPromise = useLoaderData() as DeferData;

  return (
    <Flex w={'100%'} justify={'space-around'} flexWrap={'wrap'}>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Await
          resolve={dataPromise.articles}
          errorElement={<p>Error loading articles data!</p>}
        >
          {renderArticles}
        </Await>
      </React.Suspense>
    </Flex>
  );
};

export default ArticlesList;
