import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import heroSectionHeader from '../../assets/images/hero-section-header.jpg';

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
      px={'9'}
    >
      <Box
        w={'30em'}
        h={'22em'}
        bgColor={'blackAlpha.300'}
        borderRadius={'5'}
        p={'9'}
      >
        <Flex flexDir={'column'} justify={'space-between'} minH={'100%'}>
          <Box>
            <Heading as={'h2'} size={'2xl'} color={'white'}>
              Добредојдовте
            </Heading>
            <Text mt={8} color={'white'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
          <Box>
            <Button>Прочитај повеќе</Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default HeroSection;
