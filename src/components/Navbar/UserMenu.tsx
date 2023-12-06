import {
  HStack,
  Flex,
  Menu,
  Avatar,
  VStack,
  Icon,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Text,
  MenuButton,
} from '@chakra-ui/react';

import { useColorModeValue } from '@chakra-ui/system';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
} from '@heroicons/react/20/solid';
import { ChevronDown, Flower3 } from 'react-bootstrap-icons';

import useUserStore from '@/stores/useUserStore';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';

import { JWT_TOKEN_KEY, USER_INFO_KEY } from '@constants/local-storage-keys';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';
import { useLocalStorage } from 'usehooks-ts';
import emptyUserInfo from '@constants/empty-user-info';
import { Roles } from '@/data/constants/user-roles';

type Props = {
  onOpenDisplayPreferencesCallback: () => void;
};

const UserMenu = ({ onOpenDisplayPreferencesCallback }: Props) => {
  const user = useUserStore((state) => state.user, shallow);

  const navigate = useNavigate();

  const isAuth = useIsAuthenticated();
  const [, setJwtToken] = useLocalStorage(JWT_TOKEN_KEY, { token: '' });
  const [, setUserInfo] = useLocalStorage(USER_INFO_KEY, emptyUserInfo);

  const hasRoleSpecialist = () => {
    return user.roles.includes(Roles.specialist);
  };

  const logout = () => {
    setJwtToken({ token: '' });
    setUserInfo(emptyUserInfo);

    navigate('/', { replace: true });
  };

  return (
    <HStack hidden={!isAuth()} spacing={{ base: '0', md: '6' }}>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
          >
            <HStack>
              <Avatar size={'sm'} src={user.avatarUrl} />
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                {user.firstName === '' || user.lastName === '' ? (
                  <Text fontSize="sm">{user.username}</Text>
                ) : (
                  <Text fontSize="sm">
                    {user.firstName} {user.lastName}
                  </Text>
                )}
                {/* <Text fontSize="xs" color="gray.600">
                Корисник
              </Text> */}
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <Icon as={ChevronDown} />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <MenuItem>
              <HStack spacing={2}>
                <Icon as={UserIcon} />
                <Text>Мој Профил</Text>
              </HStack>
            </MenuItem>
            {hasRoleSpecialist() ? (
              <>
                <MenuItem>
                  <HStack spacing={2}>
                    <Icon as={Flower3} />
                    <Text>Мои растенија</Text>
                  </HStack>
                </MenuItem>
                <MenuItem>
                  <HStack spacing={2}>
                    <Icon as={PencilSquareIcon} />
                    <Text>Мои статии</Text>
                  </HStack>
                </MenuItem>
              </>
            ) : null}
            <MenuItem onClick={onOpenDisplayPreferencesCallback}>
              <HStack spacing={2}>
                <SettingsIcon></SettingsIcon>
                <Text>Поставки</Text>
              </HStack>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>
              <HStack spacing={2}>
                <Icon as={ArrowLeftOnRectangleIcon} />
                <Text>Одјави се</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default UserMenu;
