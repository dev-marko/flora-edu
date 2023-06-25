import {
  Button,
  Flex,
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
  <>
    <Flex h={'full'} justify={'space-between'} flexDir={'column'}>
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ xl: 'none' }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
      <Button
        onClick={onOpenDisplayPreferencesCallback}
        size={'sm'}
        variant={'link'}
        p={4}
        display={{ xl: 'none' }}
      >
        <HStack>
          <SettingsIcon></SettingsIcon>
          <Text fontSize={'md'}>Поставки</Text>
        </HStack>
      </Button>
    </Flex>
  </>
);
