import {
  Button,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

import { NAV_ITEMS } from '@/constants/nav-items';
import { MobileNavItem } from './MobileNavItem';

type Props = {
  onOpenDisplayPreferencesCallback: () => void;
};

export const MobileNav = ({ onOpenDisplayPreferencesCallback }: Props) => (
  <Stack
    bg={useColorModeValue('white', 'gray.800')}
    p={4}
    display={{ md: 'none' }}
  >
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
    <Button
      onClick={onOpenDisplayPreferencesCallback}
      size={'sm'}
      variant={'link'}
      py={2}
    >
      <HStack>
        <SettingsIcon></SettingsIcon>
        <Text fontSize={'md'}>Поставки</Text>
      </HStack>
    </Button>
  </Stack>
);
