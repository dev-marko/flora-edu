import ArticlesApi from '@/apis/blog-api';
import BookmarkButton from '@/components/shared/BookmarkButton';
import HeartButton from '@/components/shared/HeartButton';
import { FeatureEntities } from '@/data/enums/feature-entities';
import { HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
  const [isHearted, setIsHearted] = useState(isLiked);
  const [likeNum, setLikeNum] = useState(likeCount);

  useEffect(() => {
    setLikeNum(likeCount);
  }, [likeCount]);

  const handleHeartClick = async (id: string) => {
    setIsHearted(!isHearted);

    if (!isHearted) {
      setLikeNum(++likeCount);
      await ArticlesApi.likeArticle(id);
    } else {
      setLikeNum(--likeCount);
      await ArticlesApi.unlikeArticle(id);
    }
  };

  return (
    <>
      <HStack spacing={4}>
        <HeartButton
          tooltipLabel="Ми се допаѓа"
          handleHeartClick={() => handleHeartClick(id)}
          isActive={isHearted}
          count={likeNum}
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
