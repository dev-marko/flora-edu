import {
  Box,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
  AspectRatio,
  VStack,
} from '@chakra-ui/react';

import EmailContactForm from '@/components/EmailContactForm/EmailContactForm';

import aboutUsImage1 from '../assets/images/about-us/about-us-1.jpg';
import aboutUsImage2 from '../assets/images/about-us/about-us-2.jpg';
import aboutUsImage3 from '../assets/images/about-us/about-us-3.jpg';
import ScrollToTop from '@/components/shared/ScrollToTop';

const AboutUs = () => (
  <Stack my={10} spacing={12}>
    <ScrollToTop />
    <Box>
      <Stack spacing={8}>
        <Box>
          <Heading>За Нас</Heading>
        </Box>
        <Box>
          <Text textAlign={'justify'} textIndent={'3em'}>
            ФлораЕду претставува првата македонска веб-платформа посветена за
            учење како да посадите и одржувате секакви видови растенија во
            вашиот дом. Ова е место каде луѓе од сите возрасти, со или без
            претходно искуство во градинарството, можат да учат и започнат своја
            домашна градина. Страната е создадена од страна на Марко
            Спасеновски, студент на Факултетот за компјутерски науки и
            компјутерско инженерство во Скопје. Цел на оваа иницијатива е да се
            подигне свеста и интересот кај луѓето за градинарството, креирајќи
            ги нови генерации на љубители на природата и зелени простории.
          </Text>
          <br />
          <Text textAlign={'justify'} textIndent={'3em'}>
            ФлораЕду не само што ви нуди практични упатства за грижа за
            растенијата, туку исто така ви обезбедува забавни и образовни
            ресурси за да ја разградите таинственоста на билките. Секој чекор е
            детално објаснет со лесни и разбирливи упатства, што овозможува и на
            почетниците да се почувствуваат како искусни градинари.
          </Text>
        </Box>
        <Stack
          direction={{ base: 'column', sm: 'row', md: 'row', lg: 'row' }}
          justify={'space-between'}
          align={'center'}
        >
          <Box boxSize={'xs'}>
            <Image
              boxSize={'xs'}
              objectFit={'cover'}
              borderRadius={'lg'}
              shadow={'lg'}
              src={aboutUsImage1}
              alt="Hands holding dirt and a plant"
            />
          </Box>
          <Box boxSize={'xs'}>
            <Image
              boxSize={'xs'}
              objectFit={'cover'}
              borderRadius={'lg'}
              shadow={'lg'}
              src={aboutUsImage2}
              alt="Little child watering plants"
            />
          </Box>
          <Box boxSize={'xs'}>
            <Image
              boxSize={'xs'}
              objectFit={'cover'}
              borderRadius={'lg'}
              shadow={'lg'}
              src={aboutUsImage3}
              alt="Multiple hands holding a log representing team work"
            />
          </Box>
        </Stack>
        <Box>
          <Text textAlign={'justify'} textIndent={'3em'}>
            Сите се добредојдени на ФлораЕду - каде што секој член од нашата
            заедница може да процвета и расте, буквално и метафорично, во
            својата љубов кон растенијата и природата! 🌿🌷
          </Text>
        </Box>
      </Stack>
    </Box>
    <Box>
      <Stack spacing={8}>
        <Box>
          <Heading>Контакт</Heading>
        </Box>
        <Box>
          <Text textAlign={'justify'} textIndent={'3em'}>
            Доколку имате некои забелешки, пофалби или жалби, слободно
            искористете ја формата за контакт или јавете ни се на нашиот мобилен
            телефон. Го цениме вашето мислење и секоја препорака ќе биде
            разгледана. Заедно растеме! Доколку имате слободно време, повелете и
            посетете не' во нашите канцеларии!
          </Text>
        </Box>
        <Flex
          flexDir={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
          gap={{ base: 10, md: 20 }}
        >
          <Box flex={1}>
            <Text fontSize={'xl'} fontWeight={600}>
              Адреса
            </Text>
            <Text>бр. 296</Text>
            <Text>бул. Борис Трајковски</Text>
            <Text>1000 Скопје</Text>
            <AspectRatio w={'full'} ratio={16 / 9} mt={5}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11870.185744814642!2d21.4952011!3d41.9455967!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13543debda5e5eb9%3A0x4a15ac6f947c262e!2zRmxvcmEgQ29tcGFueSAvINCk0LvQvtGA0LAg0JrQvtC80L_QsNC90Lg!5e0!3m2!1sen!2smk!4v1703976735977!5m2!1sen!2smk" />
            </AspectRatio>
          </Box>
          <Box flex={1}>
            <VStack align={'start'}>
              <Text fontSize={'xl'} fontWeight={600}>
                Напишете ни порака!
              </Text>
              <Box w={'full'}>
                <EmailContactForm></EmailContactForm>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </Stack>
    </Box>
  </Stack>
);

export default AboutUs;
