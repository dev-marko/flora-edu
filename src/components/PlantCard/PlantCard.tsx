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
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react';

import BookmarkButton from '@components/shared/BookmarkButton';

import thumbnail from '../../assets/placeholder.png';
import HeartButton from '../shared/HeartButton';
import { useNavigate } from 'react-router-dom';

type PlantCardProps = {
  id: string;
  name: string;
  description: string;
};

const PlantCard = ({ id, name, description }: PlantCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const buttonColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );
  const [isHearted, setIsHearted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleHeartClick = () => {
    setIsHearted(!isHearted);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDetailsClick = () => {
    navigate(id);
  };

  return (
    <Card
      key={id}
      maxW={'2xs'}
      maxH={'md'}
      shadow={'md'}
      mx={'5'}
      my={['5', '10']}
    >
      <CardBody p={0}>
        <Image src={thumbnail} alt="Bouquet of roses" borderTopRadius={'md'} />
        <Stack p={5}>
          <Text fontSize={'lg'} fontWeight={500}>
            {name}
          </Text>
          <Text fontSize={'sm'} color={'gray.500'} noOfLines={3}>
            {description}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justify={'center'}>
        <ButtonGroup spacing={6}>
          <HeartButton
            tooltipLabel="Ми се допаѓа"
            handleHeartClick={handleHeartClick}
            isActive={isHearted}
          ></HeartButton>
          <Button
            color={buttonColor}
            variant={'outline'}
            onClick={handleDetailsClick}
          >
            Види
          </Button>
          <BookmarkButton
            tooltipLabel="Зачувај растение"
            handleBookmarkClick={handleBookmarkClick}
            isActive={isBookmarked}
          ></BookmarkButton>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
