import PlantsApi from '@/apis/plants-api';
import BookmarkButton from '@/components/shared/BookmarkButton';
import HeartButton from '@/components/shared/HeartButton';
import { HStack, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type PlantDetailsHeaderProps = {
  id: string;
  headerImage: string;
  isLiked: boolean;
  likeCount: number;
};

const PlantDetailsHeader = ({
  id,
  headerImage,
  isLiked,
  likeCount,
}: PlantDetailsHeaderProps) => {
  const [isHearted, setIsHearted] = useState(isLiked);
  const [likeNum, setLikeNum] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
      <HStack justify={'center'}>
        <Image w={'full'} src={headerImage} />
        {/* <Box h={'300px'} w={'100vh'} bgColor={'gray.500'}></Box> */}
      </HStack>
      <HStack spacing={4}>
        <HeartButton
          tooltipLabel="Ми се допаѓа"
          handleHeartClick={() => handleHeartClick(id)}
          isActive={isHearted}
          count={likeNum}
        ></HeartButton>
        <BookmarkButton
          tooltipLabel="Зачувај растение"
          handleBookmarkClick={handleBookmarkClick}
          isActive={isBookmarked}
        ></BookmarkButton>
      </HStack>
    </>
  );
};

export default PlantDetailsHeader;
