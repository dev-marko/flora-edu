import { IconButton, Tooltip } from '@chakra-ui/react';

import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';

type BookmarkButtonProps = {
  tooltipLabel: string;
  handleBookmarkClick: () => void;
  isActive: boolean;
};

const BookmarkButton = ({
  tooltipLabel,
  handleBookmarkClick,
  isActive,
}: BookmarkButtonProps) => {
  return (
    <Tooltip
      hasArrow
      placement="bottom"
      label={tooltipLabel}
      aria-label="Bookmark popular article"
    >
      <IconButton
        onClick={handleBookmarkClick}
        size={'sm'}
        aria-label="Bookmark article"
        icon={isActive ? <BookmarkIconSolid /> : <BookmarkIconOutline />}
        variant={'link'}
        color={'yellow.500'}
      />
    </Tooltip>
  );
};

export default BookmarkButton;
