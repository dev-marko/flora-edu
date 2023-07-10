import { IconButton, Tooltip } from '@chakra-ui/react';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

type HeartButtonProps = {
  tooltipLabel: string;
  handleHeartClick: () => void;
  isActive: boolean;
};

const HeartButton = ({
  tooltipLabel,
  handleHeartClick,
  isActive,
}: HeartButtonProps) => {
  return (
    <Tooltip
      hasArrow
      placement="bottom"
      label={tooltipLabel}
      aria-label="Bookmark popular article"
    >
      <IconButton
        onClick={handleHeartClick}
        size={'sm'}
        aria-label="Bookmark article"
        icon={isActive ? <HeartIconSolid /> : <HeartIconOutline />}
        variant={'link'}
        color={'red.500'}
      />
    </Tooltip>
  );
};

export default HeartButton;
