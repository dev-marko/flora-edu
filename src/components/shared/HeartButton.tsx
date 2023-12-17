import { IconButton, Tooltip, Text, HStack } from '@chakra-ui/react';

import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';

type HeartButtonProps = {
  tooltipLabel: string;
  handleHeartClick: () => void;
  isActive: boolean;
  count?: number;
};

const HeartButton = ({
  tooltipLabel,
  handleHeartClick,
  isActive,
  count,
}: HeartButtonProps) => {
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
            icon={isActive ? <HeartIconSolid /> : <HeartIconOutline />}
            variant={'link'}
            color={'red.500'}
          />
        </Tooltip>
        {count ? (
          <Text color={'red'} p={0} m={0}>
            {count}
          </Text>
        ) : null}
      </HStack>
    </>
  );
};

export default HeartButton;
