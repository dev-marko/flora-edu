import {
  Icon,
  IconButton,
  PlacementWithLogical,
  Tooltip,
} from '@chakra-ui/react';

import { ExclamationCircleIcon as ExclamationIconSolid } from '@heroicons/react/20/solid';

type InfoTooltipProps = {
  tooltipLabel: string;
  labelPlacement: PlacementWithLogical;
  ariaLabel: string;
};

const InfoTooltip = ({
  tooltipLabel,
  labelPlacement,
  ariaLabel,
}: InfoTooltipProps) => {
  return (
    <Tooltip
      hasArrow
      placement={labelPlacement}
      label={tooltipLabel}
      aria-label={ariaLabel}
    >
      <Icon
        display={'inline'}
        aria-label={ariaLabel}
        as={ExclamationIconSolid}
        color={'gray.500'}
      />
    </Tooltip>
  );
};

export default InfoTooltip;
