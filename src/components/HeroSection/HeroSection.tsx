import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import heroSectionHeader from '../../assets/images/hero-section/hero-section-header.jpg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
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
            Добредојдовте во нашата зелена оаза! 🌿 Загазете во светот на
            грижата за растенијата со нашата веб апликација, создадена да ја
            негува вашата љубов кон сè ботаничко. Независно дали сте искусен
            родител на растенија или само ја започнувате својата зелена
            авантура, нашата интерактивна платформа нуди богатство на знаење за
            посадување и одржување на процветана домашна градина. Истражете
            експертски совети, чекор-по-чекор упатства и персонализирана насока
            за изградба на врска со вашите листни пријатели. Придружете се на
            нашата растечка заедница на ентузијасти за растенија и заедно
            кренете на зелена авантура! 🌱✨
          </Text>
          <Button onClick={() => navigate('about-us')}>Прочитај повеќе</Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default HeroSection;
