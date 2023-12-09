import { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  VStack,
  Divider,
  HStack,
  Center,
} from '@chakra-ui/react';

import { Flower3, House, List, PencilSquare } from 'react-bootstrap-icons';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: any;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Дома', icon: House, path: '/dashboard' },
  { name: 'Мои статии', icon: PencilSquare, path: 'article-editor' },
  { name: 'Мои растенија', icon: Flower3, path: 'plant-editor' },
  { name: 'Kон ФлораЕду', icon: ArrowLeftOnRectangleIcon, path: '/' },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <VStack align={'start'} spacing={0}>
          <Text fontSize="2xl" fontFamily={'Yeseva One'} fontWeight={'400'}>
            ФлораЕду
          </Text>
          <Text fontSize={'sm'}>Контролен панел</Text>
        </VStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Divider my={3} />
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: any;
  path: string;
  children: any;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <NavLink to={path}>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'primary.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<List />}
      />

      <HStack ml={8} align={'center'} spacing={3}>
        <Text fontSize="2xl" fontFamily={'Yeseva One'} fontWeight={'400'}>
          ФлораЕду
        </Text>
        <Center height="50px">
          <Divider orientation="vertical" borderColor={'blackAlpha.600'} />
        </Center>
        <Text fontSize={'sm'}>Контролен панел</Text>
      </HStack>
    </Flex>
  );
};
