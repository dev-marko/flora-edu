import { useState } from 'react';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';

import BookmarkButton from '@components/shared/BookmarkButton';

import thumbnail from '../../assets/placeholder.png';
import { AuthorDto } from '@/data/interfaces/author-dto';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import 'moment/dist/locale/mk';
import { FeatureEntities } from '@/data/enums/feature-entities';

type ArticleCardProps = {
  id: string;
  title: string;
  shortDescription: string;
  headerImageUrl: string;
  createdAt: Date;
  author: AuthorDto;
  isBookmarked: boolean;
};
const ArticleCard = ({
  id,
  title,
  shortDescription,
  headerImageUrl,
  createdAt,
  author,
  isBookmarked,
}: ArticleCardProps) => {
  const theme = useTheme();
  const buttonColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(id);
  };

  const showDate = (): string => {
    const instance: Moment = moment(createdAt);
    instance.locale('mk');
    return instance.format('MMMM d, YYYY');
  };

  return (
    <Card
      key={id}
      direction={{ base: 'column', sm: 'row' }}
      shadow={'md'}
      maxH={{ base: 'lg', sm: 'md' }}
      mx={'10'}
      my={'5'}
    >
      <Image
        src={thumbnail}
        alt="Temporary placeholder thumbnail"
        objectFit="cover"
        maxW={{ base: '100%', sm: '300px' }}
        borderTopLeftRadius={'md'}
        borderTopRightRadius={{ base: 'md', md: 'none' }}
        borderBottomLeftRadius={{ md: 'md' }}
      />
      <Stack spacing={0}>
        <CardHeader>
          <VStack align={'start'} spacing={1}>
            <Heading as="h3" size="lg">
              {title}
            </Heading>
            <Text>
              Автор: {author.firstName} {author.lastName}
            </Text>
            <Text fontSize={'sm'} color={'gray.500'}>
              {showDate()}
            </Text>
          </VStack>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3}>{shortDescription}</Text>
        </CardBody>
        <CardFooter justify={'end'}>
          <ButtonGroup spacing={6}>
            <BookmarkButton
              entityId={id}
              entityBeingBookmarked={FeatureEntities.Article}
              tooltipLabel="Зачувај статија"
              initBookmarkStatus={isBookmarked}
            ></BookmarkButton>
            <Button
              color={buttonColor}
              variant={'outline'}
              onClick={handleDetailsClick}
            >
              Прочитај повеќе
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ArticleCard;
