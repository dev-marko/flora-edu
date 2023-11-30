import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Heading,
  useTheme,
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';
import { Link } from 'react-router-dom';
// import { isLoggedIn } from '@/hooks/useIsAuthenticated';

import UserMenu from './UserMenu';
import { useIsAuthenticated } from '@/hooks/useIsAuthenticated';

type Props = {
  onOpenDisplayPreferencesCallback: () => void;
};

const Navbar = ({ onOpenDisplayPreferencesCallback }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  const theme = useTheme();
  const logoColor = useColorModeValue(
    theme.colors.primary[500],
    theme.colors.primary[200]
  );

  const isAuth = useIsAuthenticated();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2, md: 6 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex
          flex={1}
          justify={{ base: 'space-between', md: 'space-between' }}
          align={'center'}
        >
          <IconButton
            display={{ base: 'flex', md: 'flex', lg: 'flex', xl: 'none' }}
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
          <Heading
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            color={logoColor}
            fontFamily={'Yeseva One'}
            fontWeight={'400'}
          >
            ФлораЕду
          </Heading>

          <Flex display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            <DesktopNav />
          </Flex>
          <Stack
            hidden={isAuth()}
            justify={'start'}
            direction={'row'}
            spacing={2}
          >
            <Button
              hidden={isAuth()}
              variant={'link'}
              size={{ base: 'xs', md: 'md', lg: 'lg', xl: 'sm' }}
            >
              <Link to="/login">Најава</Link>
            </Button>
            <Link to="/register">
              <Button
                hidden={isAuth()}
                display={{
                  base: 'none',
                  md: 'none',
                  lg: 'none',
                  xl: 'inline-flex',
                }}
                size={'sm'}
              >
                Регистрација
              </Button>
            </Link>
          </Stack>
          <UserMenu
            onOpenDisplayPreferencesCallback={onOpenDisplayPreferencesCallback}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity endingHeight={'45em'}>
        <MobileNav
          onOpenDisplayPreferencesCallback={onOpenDisplayPreferencesCallback}
        />
      </Collapse>
    </Box>
  );
};

export default Navbar;
