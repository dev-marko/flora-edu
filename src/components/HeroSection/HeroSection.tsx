import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import heroSectionHeader from '../../assets/images/hero-section/hero-section-header.jpg';

const HeroSection = () => {
  return (
    <Flex
      bgImage={heroSectionHeader}
      bgRepeat={'no-repeat'}
      bgSize={'cover'}
      h={'35em'}
      borderRadius={'20'}
      alignItems={'center'}
      justify={'start'}
      px={{ base: 3, sm: 3, md: 10 }}
      mt={3}
      mb={8}
    >
      <Box w={'32.5em'} bgColor={'blackAlpha.300'} borderRadius={'5'} p={10}>
        <Stack direction={'column'} align={'start'} spacing={10}>
          <Heading as={'h2'} size={'2xl'} color={'white'}>
            Добредојдовте
          </Heading>
          <Text color={'white'} noOfLines={{ base: 6 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
          <Button>Прочитај повеќе</Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default HeroSection;
