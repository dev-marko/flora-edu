import BookmarkButton from '@/components/shared/BookmarkButton';
import HeartButton from '@/components/shared/HeartButton';
import { FeatureEntities } from '@/data/enums/feature-entities';
import { HStack } from '@chakra-ui/react';

type ArticleActionBarProps = {
  id: string;
  isLiked: boolean;
  likeCount: number;
  isBookmarked: boolean;
};

const ArticleActionBar = ({
  id,
  isLiked,
  likeCount,
  isBookmarked,
}: ArticleActionBarProps) => {
  return (
    <>
      <HStack spacing={4}>
        <HeartButton
          entityId={id}
          entityBeingLiked={FeatureEntities.Article}
          tooltipLabel="Зачувај статија"
          initLikeStatus={isLiked}
          count={likeCount}
        ></HeartButton>
        <BookmarkButton
          entityId={id}
          entityBeingBookmarked={FeatureEntities.Article}
          tooltipLabel="Зачувај статија"
          initBookmarkStatus={isBookmarked}
        ></BookmarkButton>
      </HStack>
    </>
  );
};

export default ArticleActionBar;
