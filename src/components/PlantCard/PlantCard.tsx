import { useEffect, useState } from 'react';

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
import PlantsApi from '@/apis/plants-api';
import { FeatureEntities } from '@/data/enums/feature-entities';

type PlantCardProps = {
  id: string;
  name: string;
  description: string;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

const PlantCard = ({
  id,
  name,
  description,
  likeCount,
  isLiked,
  isBookmarked,
}: PlantCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const buttonColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  const [isHearted, setIsHearted] = useState(isLiked);
  const [likeNum, setLikeNum] = useState(likeCount);

  useEffect(() => {
    setLikeNum(likeCount);
  }, [likeCount]);

  const handleHeartClick = async (id: string) => {
    setIsHearted(!isHearted);

    if (!isHearted) {
      setLikeNum(++likeCount);
      await PlantsApi.likePlant(id);
    } else {
      setLikeNum(--likeCount);
      await PlantsApi.unlikePlant(id);
    }
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
            handleHeartClick={() => handleHeartClick(id)}
            isActive={isHearted}
            count={likeNum}
          ></HeartButton>
          <Button
            color={buttonColor}
            variant={'outline'}
            onClick={handleDetailsClick}
          >
            Види
          </Button>
          <BookmarkButton
            entityId={id}
            entityBeingBookmarked={FeatureEntities.Plant}
            tooltipLabel="Зачувај растение"
            initBookmarkStatus={isBookmarked}
          ></BookmarkButton>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
