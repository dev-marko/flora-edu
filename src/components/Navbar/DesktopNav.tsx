import {
  Stack,
  Link,
  Box,
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@/constants/nav-items';

export const DesktopNav = () => {
  const theme = useTheme();
  const linkColor = useColorModeValue(
    theme.colors.primary[800],
    theme.colors.primary[200]
  );
  const linkHoverColor = useColorModeValue(
    theme.colors.primary[900],
    theme.colors.primary[300]
  );

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            href={navItem.href ?? '#'}
            fontSize={'md'}
            fontWeight={600}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};
