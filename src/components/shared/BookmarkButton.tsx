import { IconButton, Tooltip } from '@chakra-ui/react';

import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { useState } from 'react';
import PlantsApi from '@/apis/plants-api';
import { FeatureEntities } from '@/data/enums/feature-entities';
import ArticlesApi from '@/apis/blog-api';

type BookmarkButtonProps = {
  entityId: string;
  tooltipLabel: string;
  initBookmarkStatus: boolean;
  entityBeingBookmarked: FeatureEntities;
};

const BookmarkButton = ({
  entityId,
  tooltipLabel,
  initBookmarkStatus,
  entityBeingBookmarked,
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(initBookmarkStatus);

  const handleBookmarkClick = async () => {
    setIsBookmarked(!isBookmarked);
    switch (entityBeingBookmarked) {
      case FeatureEntities.Plant:
        console.log('in plant')
        await PlantsApi.bookmarkPlant(entityId);
        break;
      case FeatureEntities.Article:
        console.log('in article')
        await ArticlesApi.bookmarkArticle(entityId);
        break;
    }
  };

  return (
    <Tooltip
      hasArrow
      placement="bottom"
      label={tooltipLabel}
      aria-label="Bookmark button"
    >
      <IconButton
        onClick={handleBookmarkClick}
        size={'sm'}
        aria-label="Bookmark button"
        icon={isBookmarked ? <BookmarkIconSolid /> : <BookmarkIconOutline />}
        variant={'link'}
        color={'yellow.500'}
      />
    </Tooltip>
  );
};

export default BookmarkButton;
