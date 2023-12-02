import { ReactNode } from 'react';

import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@constants/nav-items';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  const theme = useTheme();

  const bgColor = useColorModeValue(
    theme.colors.primary[300],
    theme.colors.gray[700]
  );

  return (
    <Box bg={bgColor} color={'white'}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack align={'flex-start'}>
            <ListHeader>Навигација</ListHeader>
            {NAV_ITEMS.map((navItem) => (
              <Link href={navItem.href ?? '#'}>{navItem.label}</Link>
            ))}
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Поддршка</ListHeader>
            <Link href={'#'}>Контакт</Link>
            <Link href={'#'}>Полиса за приватност</Link>
            <Link href={'#'}>Полиса за колачиња</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Социјални мрежи</ListHeader>
            <Link href={'#'}>Facebook</Link>
            <Link href={'#'}>Twitter</Link>
            <Link href={'#'}>YouTube</Link>
            <Link href={'#'}>Instagram</Link>
            <Link href={'#'}>LinkedIn</Link>
          </Stack>
          <Stack spacing={6} justify={{ md: 'end' }} align={{ md: 'end' }}>
            <Box>
              <Heading
                color={'white'}
                fontFamily={'Yeseva One'}
                fontWeight={'400'}
              >
                ФлораЕду
              </Heading>
            </Box>
            <Text fontSize={'sm'}>
              © 2023 ФлораЕду. Сите права се задржани.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
