import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
  Heading,
  useTheme,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SettingsIcon } from '@chakra-ui/icons';

import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

type Props = {
  onOpenDisplayPreferencesCallback: () => void;
};

const Navbar = ({ onOpenDisplayPreferencesCallback }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  const theme = useTheme();

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
            color={theme.colors.primary[500]}
            fontFamily={'Yeseva One'}
            fontWeight={'400'}
          >
            ФлораЕду
          </Heading>

          <Flex display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}>
            <DesktopNav />
          </Flex>
          <Stack justify={'start'} direction={'row'} spacing={2}>
            <Button
              as={'a'}
              variant={'link'}
              size={{ base: 'xs', md: 'md', lg: 'lg', xl: 'sm' }}
              href={'#'}
            >
              Најава
            </Button>
            <Button
              as={'a'}
              display={{
                base: 'none',
                md: 'none',
                lg: 'none',
                xl: 'inline-flex',
              }}
              size={'sm'}
              href={'#'}
            >
              Регистрација
            </Button>
            <Button
              onClick={onOpenDisplayPreferencesCallback}
              size={'sm'}
              display={{
                base: 'none',
                md: 'none',
                lg: 'none',
                xl: 'inline-flex',
              }}
            >
              <HStack>
                <SettingsIcon></SettingsIcon>
                <Text fontSize={'sm'}>Поставки</Text>
              </HStack>
            </Button>
          </Stack>
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
