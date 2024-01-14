import ArticlesApi from '@/apis/blog-api';
import AuthorInfo from '@/components/AuthorInfo/AuthorInfo';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
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
  useToast,
  ListItem,
  OrderedList,
  UnorderedList,
  Box,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Await, defer, useLoaderData, useRevalidator } from 'react-router-dom';
import header from '../../assets/header.png';
import { NewArticleComment } from '@/data/interfaces/new-article-comment';
import { Send } from 'react-bootstrap-icons';
import Comment from '@components/shared/Comment';
import ArticleActionBar from './ArticleActionBar';
import { FeatureEntities } from '@/data/enums/feature-entities';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { useAnalytics } from 'use-analytics';
import Markdown from 'react-markdown';
import CustomH1 from '@/components/custom-markdown/CustomH1';
import CustomH2 from '@/components/custom-markdown/CustomH2';
import CustomH3 from '@/components/custom-markdown/CustomH3';
import CustomH4 from '@/components/custom-markdown/CustomH4';
import CustomH5 from '@/components/custom-markdown/CustomH5';
import CustomH6 from '@/components/custom-markdown/CustomH6';
import BigGenericErrorMessage from '@/components/shared/BigGenericErrorMessage';

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
  const toast = useToast();
  const analytics = useAnalytics();

  useEffect(() => {
    async function fetchData() {
      const axiosResponse = await dataPromise.payload;
      analytics.page({
        articleId: axiosResponse.data.id,
        endpoint: FeatureEntities.Article,
      });
    }
    fetchData();
  }, []);

  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const [commentContent, setCommentContent] = useState('');

  const handleCommentOnChange = (value: string) => {
    setCommentContent(value);
  };

  const renderArticle = (axiosResponse: AxiosResponse<ArticleData>) => {
    const article: ArticleData = axiosResponse.data;

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
        <VStack align={'start'} spacing={4} w={'full'}>
          <HStack w={'full'} align={'center'} justify={'center'}>
            <Box w={'full'}>
              <Image
                w={'full'}
                maxH={'50vh'}
                src={article.headerImageUrl ?? header}
                objectFit={'cover'}
                rounded={'lg'}
              />
            </Box>
          </HStack>
          <Heading>{article.title}</Heading>
          <Text fontSize={'lg'}>{article.subtitle}</Text>
          <CustomDivider dividerColor={dividerColor} />
          {/* <Text>{article.content}</Text> */}
          <VStack align={'start'} w={'full'}>
            <Markdown
              components={{
                h1: CustomH1,
                h2: CustomH2,
                h3: CustomH3,
                h4: CustomH4,
                h5: CustomH5,
                h6: CustomH6,
                ol: OrderedList,
                ul: UnorderedList,
                li: ListItem,
              }}
            >
              {article.content}
            </Markdown>
          </VStack>
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
                featureEntity={FeatureEntities.ArticleComment}
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
        errorElement={<BigGenericErrorMessage />}
        resolve={dataPromise.payload}
      >
        {renderArticle}
      </Await>
    </React.Suspense>
  );
};

export default Article;
