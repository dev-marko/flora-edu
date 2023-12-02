import {
  useDisclosure,
  useColorModeValue,
  Stack,
  Flex,
  Link,
  Icon,
  Text,
  Collapse,
  useTheme,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

import { NavItem } from '@interfaces/nav-item';

export const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  const theme = useTheme();
  const labelColor = useColorModeValue(
    theme.colors.primary[800],
    theme.colors.primary[200]
  );

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={labelColor}
          _activeLink={{
            color: theme.colors.primary[500],
          }}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} as={NavLink} to={child.href} py={2}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
