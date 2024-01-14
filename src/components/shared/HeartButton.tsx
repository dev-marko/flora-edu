import { useState } from 'react';
import { IconButton, Tooltip, Text, HStack } from '@chakra-ui/react';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

import { FeatureEntities } from '@/data/enums/feature-entities';
import PlantsApi from '@/apis/plants-api';
import ArticlesApi from '@/apis/blog-api';

type HeartButtonProps = {
  entityId: string;
  tooltipLabel: string;
  initLikeStatus: boolean;
  entityBeingLiked: FeatureEntities;
  count?: number;
  disable?: boolean;
};

const HeartButton = ({
  entityId,
  tooltipLabel,
  initLikeStatus: initBookmarkStatus,
  entityBeingLiked,
  count = 0,
  disable = false,
}: HeartButtonProps) => {
  const [isLiked, setIsLiked] = useState(initBookmarkStatus);
  const [likeCount, setLikeCount] = useState(count);

  const handleHeartClick = async () => {
    setIsLiked(!isLiked);
    switch (entityBeingLiked) {
      case FeatureEntities.Plant:
        await PlantsApi.likePlant(entityId);
        break;
      case FeatureEntities.Article:
        await ArticlesApi.likeArticle(entityId);
        break;
      case FeatureEntities.PlantComment:
        await PlantsApi.likeComment(entityId);
        break;
      case FeatureEntities.ArticleComment:
        await ArticlesApi.likeComment(entityId);
        break;
    }

    let tempCount = likeCount;

    if (!isLiked) {
      setLikeCount(++tempCount);
    } else if (count > 0) {
      setLikeCount(--tempCount);
    } else {
      setLikeCount(0);
    }
  };

  return (
    <>
      <HStack spacing={1}>
        <Tooltip
          hasArrow
          placement="bottom"
          label={tooltipLabel}
          aria-label="Like button"
        >
          <IconButton
            onClick={handleHeartClick}
            size={'sm'}
            aria-label="Like button"
            icon={isLiked ? <HeartIconSolid /> : <HeartIconOutline />}
            variant={'link'}
            color={'red.500'}
            isDisabled={disable}
          />
        </Tooltip>
        {likeCount !== 0 ? (
          <Text color={'red'} p={0} m={0}>
            {likeCount}
          </Text>
        ) : null}
      </HStack>
    </>
  );
};

export default HeartButton;
