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

type PopularArticleCardProps = {
  id: string;
  title: string;
  author: string;
  description: string;
};
const PopularArticleCard = ({
  id,
  title,
  author,
  description,
}: PopularArticleCardProps) => {
  const theme = useTheme();
  const buttonColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
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
          <Text>Автор: {author}</Text>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3}>{description}</Text>
        </CardBody>
        <CardFooter justify={'end'}>
          <ButtonGroup spacing={6}>
            <BookmarkButton
              tooltipLabel="Зачувај статија"
              handleBookmarkClick={handleBookmarkClick}
              isActive={isBookmarked}
            ></BookmarkButton>
            <Button color={buttonColor} variant={'outline'}>
              Прочитај повеќе
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default PopularArticleCard;
