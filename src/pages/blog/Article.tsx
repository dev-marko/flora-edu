import ArticlesApi from '@/apis/blog-api';
import AuthorInfo from '@/components/AuthorInfo/AuthorInfo';
import BookmarkButton from '@/components/shared/BookmarkButton';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import HeartButton from '@/components/shared/HeartButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Article as ArticleData } from '@/data/interfaces/article';
import {
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useState } from 'react';
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom';
import header from '../../assets/header.png';
import { NewArticleComment } from '@/data/interfaces/new-article-comment';
import { Send } from 'react-bootstrap-icons';
import Comment from '@components/shared/Comment';
import ArticleActionBar from './ArticleActionBar';

type DeferData = {
  payload: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader(articleId: string | undefined) {
  return defer({
    payload: ArticlesApi.getArticleById(articleId),
  });
}

const Article = () => {
  const dataPromise = useLoaderData() as DeferData;
  const revalidator = useRevalidator();

  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const [commentContent, setCommentContent] = useState('');

  const handleCommentOnChange = (value: string) => {
    setCommentContent(value);
  };

  const renderArticle = (axiosResponse: AxiosResponse<ArticleData>) => {
    const article = axiosResponse.data;

    const handleCommentSend = () => {
      const newArticleComment: NewArticleComment = {
        articleId: article.id,
        content: commentContent,
      };

      setCommentContent('');
      ArticlesApi.addNewComment(newArticleComment)
        .then(() => {
          revalidator.revalidate();
        })
        .catch((err) => console.error(err));
    };

    return (
      <>
        <Breadcrumbs />
        <VStack align={'start'} spacing={4} w={'fill'}>
          <HStack justify={'center'}>
            <Image w={'full'} src={header} />
            {/* <Box h={'300px'} w={'100vh'} bgColor={'gray.500'}></Box> */}
          </HStack>
          <Heading>{article.title}</Heading>
          <Text fontSize={'lg'}>{article.subtitle}</Text>
          <CustomDivider dividerColor={dividerColor} />
          <Text>{article.content}</Text>
          <CustomDivider dividerColor={dividerColor} />
          <ArticleActionBar
            id={article.id}
            isLiked={article.isLiked}
            isBookmarked={article.isBookmarked}
            likeCount={article.likeCount}
          />
          <Divider />
          <AuthorInfo author={article.author} />
          <Divider />
          <Heading as="h3" size="lg">
            ({article.comments.length}) Коментари
          </Heading>
          <CustomDivider dividerColor={dividerColor} />
          <HStack w={'full'} align={'start'} mb={5}>
            <Textarea
              placeholder="Остави коментар..."
              value={commentContent}
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
            {article.comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                user={comment.user}
                content={comment.content}
                date={comment.createdAt}
                isLiked={comment.isLiked}
                likeCount={comment.likeCount}
                isPlantComment={false}
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
        {renderArticle}
      </Await>
    </React.Suspense>
  );
};

export default Article;
