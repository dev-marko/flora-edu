import { Stack, Link, Box, useTheme } from '@chakra-ui/react';
import { NAV_ITEMS } from '@/constants/nav-items';

export const DesktopNav = () => {
  // const linkColor = useColorModeValue('gray.600', 'gray.200');
  // const linkHoverColor = useColorModeValue('gray.800', 'white');

  const theme = useTheme();

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            href={navItem.href ?? '#'}
            fontSize={'md'}
            fontWeight={600}
            color={theme.colors.primary[800]}
            _hover={{
              textDecoration: 'none',
              color: theme.colors.primary[900],
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};
