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
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';

import BookmarkButton from '@components/shared/BookmarkButton';

import thumbnail from '../../assets/placeholder.png';
import { AuthorDto } from '@/data/interfaces/author-dto';
import { useNavigate } from 'react-router-dom';

type ArticleCardProps = {
  id: string;
  title: string;
  shortDescription: string;
  headerImageUrl: string;
  createdAt: string;
  author: AuthorDto;
  isLiked: boolean;
  isBookmarked: boolean;
};
const ArticleCard = ({
  id,
  title,
  shortDescription,
  author,
  isBookmarked,
}: // id,
// title,
// shortDescription,
// headerImageUrl,
// createdAt,
// author,
// isLiked,
// isBookmarked,
ArticleCardProps) => {
  const theme = useTheme();
  const buttonColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  const navigate = useNavigate();

  const [isArticleBookmarked, setIsBookmarked] = useState(isBookmarked);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isArticleBookmarked);
  };

  const handleDetailsClick = () => {
    navigate(id);
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
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          <Text>
            Автор: {author.firstName} {author.lastName}
          </Text>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3}>{shortDescription}</Text>
        </CardBody>
        <CardFooter justify={'end'}>
          <ButtonGroup spacing={6}>
            <BookmarkButton
              tooltipLabel="Зачувај статија"
              handleBookmarkClick={handleBookmarkClick}
              isActive={isArticleBookmarked}
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
