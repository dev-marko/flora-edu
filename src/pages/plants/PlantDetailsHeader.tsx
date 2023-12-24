import BookmarkButton from '@/components/shared/BookmarkButton';
import HeartButton from '@/components/shared/HeartButton';
import { FeatureEntities } from '@/data/enums/feature-entities';
import { HStack, Image } from '@chakra-ui/react';

type PlantDetailsHeaderProps = {
  id: string;
  headerImage: string;
  isLiked: boolean;
  likeCount: number;
  isBookmarked: boolean;
};

const PlantDetailsHeader = ({
  id,
  headerImage,
  isLiked,
  likeCount,
  isBookmarked,
}: PlantDetailsHeaderProps) => {
  return (
    <>
      <HStack justify={'center'}>
        <Image w={'full'} src={headerImage} />
        {/* <Box h={'300px'} w={'100vh'} bgColor={'gray.500'}></Box> */}
      </HStack>
      <HStack spacing={4}>
        <HeartButton
          entityId={id}
          entityBeingLiked={FeatureEntities.Plant}
          tooltipLabel="Зачувај растение"
          initLikeStatus={isLiked}
          count={likeCount}
        ></HeartButton>
        <BookmarkButton
          entityId={id}
          entityBeingBookmarked={FeatureEntities.Plant}
          tooltipLabel="Зачувај растение"
          initBookmarkStatus={isBookmarked}
          withConfirmDialog={false}
        ></BookmarkButton>
      </HStack>
    </>
  );
};

export default PlantDetailsHeader;
