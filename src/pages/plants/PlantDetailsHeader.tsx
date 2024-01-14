import BookmarkButton from '@/components/shared/BookmarkButton';
import HeartButton from '@/components/shared/HeartButton';
import { FeatureEntities } from '@/data/enums/feature-entities';
import { Box, HStack, Image } from '@chakra-ui/react';
import header from '../../assets/header.png';

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
      <HStack w={'full'} align={'center'} justify={'center'}>
        <Box w={'full'}>
          <Image
            w={'full'}
            maxH={'50vh'}
            src={headerImage ?? header}
            objectFit={'cover'}
            rounded={'lg'}
          />
        </Box>
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
