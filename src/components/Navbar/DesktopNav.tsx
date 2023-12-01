import {
  Link,
  Box,
  useTheme,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@/constants/nav-items';
import { NavLink } from 'react-router-dom';

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
    <HStack spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            key={navItem.label}
            as={NavLink}
            to={navItem.href}
            p={2}
            fontSize={'md'}
            fontWeight={600}
            color={linkColor}
            _hover={{
              textDecoration: 'underline',
              color: linkHoverColor,
            }}
            _activeLink={{
              color: theme.colors.primary[500],
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </HStack>
  );
};
