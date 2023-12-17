import ArticlesApi from '@/apis/blog-api';
import BookmarkButton from '@/components/shared/BookmarkButton';
import HeartButton from '@/components/shared/HeartButton';
import { HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type ArticleActionBarProps = {
  id: string;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
};

const ArticleActionBar = ({
  id,
  isLiked,
  isBookmarked,
  likeCount,
}: ArticleActionBarProps) => {
  const [isHearted, setIsHearted] = useState(isLiked);
  const [likeNum, setLikeNum] = useState(likeCount);
  const [bookmark, setIsBookmarked] = useState(false);

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

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
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
          tooltipLabel="Зачувај растение"
          handleBookmarkClick={handleBookmarkClick}
          isActive={isBookmarked}
        ></BookmarkButton>
      </HStack>
    </>
  );
};

export default ArticleActionBar;
