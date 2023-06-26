import { useState } from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Image,
  Stack,
  ButtonGroup,
  Button,
  IconButton,
} from '@chakra-ui/react';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';

// TODO: Type and accept props

const PlantCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card maxW={'2xs'} maxH={'md'} shadow={'md'} m={'10'}>
      <CardBody p={0}>
        <Image
          src="https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Cheight=650%2Cq=70%2Csharpen=1%2Cwidth=956/wp-content/uploads/colourful-rose-2022-09-16-02-50-50-utc-scaled.jpg"
          alt="Bouquet of roses"
          borderTopRadius={'md'}
        />
        <Stack p={5}>
          <Text fontSize={'lg'} fontWeight={500}>
            Име на растение
          </Text>
          <Text fontSize={'sm'} color={'gray.500'} noOfLines={[1, 2, 3]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justify={'center'}>
        <ButtonGroup spacing={6}>
          <IconButton
            onClick={handleHeartClick}
            size={'sm'}
            aria-label="Heart plant"
            icon={isLiked ? <HeartIconSolid /> : <HeartIconOutline />}
            variant={'link'}
            color={'red.500'}
          />
          <Button>Види</Button>
          <IconButton
            onClick={handleBookmarkClick}
            size={'sm'}
            aria-label="Bookmark plant"
            icon={
              isBookmarked ? <BookmarkIconSolid /> : <BookmarkIconOutline />
            }
            variant={'link'}
            color={'yellow.500'}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
