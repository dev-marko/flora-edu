import { IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { useState } from 'react';
import PlantsApi from '@/apis/plants-api';
import { FeatureEntities } from '@/data/enums/feature-entities';
import ArticlesApi from '@/apis/blog-api';
import ConfirmationDialog from './ConfirmationDialog';
import React from 'react';

type BookmarkButtonProps = {
  entityId: string;
  tooltipLabel: string;
  initBookmarkStatus: boolean;
  entityBeingBookmarked: FeatureEntities;
  withConfirmDialog: boolean;
};

const BookmarkButton = ({
  entityId,
  tooltipLabel,
  initBookmarkStatus,
  entityBeingBookmarked,
  withConfirmDialog,
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(initBookmarkStatus);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleBookmarkClick = async () => {
    if (withConfirmDialog) {
      onOpen();
      return;
    }

    setIsBookmarked(!isBookmarked);
    switch (entityBeingBookmarked) {
      case FeatureEntities.Plant:
        await PlantsApi.bookmarkPlant(entityId);
        break;
      case FeatureEntities.Article:
        await ArticlesApi.bookmarkArticle(entityId);
        break;
    }
  };

  return (
    <>
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
      {withConfirmDialog ? (
        <ConfirmationDialog
          isOpen={isOpen}
          onClose={onClose}
          cancelRef={cancelRef}
          headerText="Избриши зачувана содржина"
          bodyText="Дали сте сигурни?"
          mainAction={handleBookmarkClick}
          mainActionButtonText="Избриши"
        />
      ) : null}
    </>
  );
};

export default BookmarkButton;
