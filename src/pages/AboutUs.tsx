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

const AboutUs = () => (
  <Stack my={10} spacing={12}>
    <Box>
      <Stack spacing={8}>
        <Box>
          <Heading>За Нас</Heading>
        </Box>
        <Box>
          <Text textAlign={'justify'} textIndent={'3em'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
            lorem dolor sed viverra ipsum nunc. Ultrices gravida dictum fusce ut
            placerat orci. Sit amet mauris commodo quis imperdiet massa
            tincidunt nunc. Dui faucibus in ornare quam viverra orci sagittis eu
            volutpat. Sagittis eu volutpat odio facilisis mauris sit amet massa
            vitae. Convallis tellus id interdum velit laoreet id donec ultrices.
            In est ante in nibh mauris. Volutpat odio facilisis mauris sit amet
            massa vitae. Cursus in hac habitasse platea dictumst quisque
            sagittis. Sagittis nisl rhoncus mattis rhoncus. Consectetur
            adipiscing elit duis tristique sollicitudin. Aliquam sem fringilla
            ut morbi tincidunt augue interdum velit. Id donec ultrices tincidunt
            arcu non. Malesuada fames ac turpis egestas integer eget aliquet
            nibh. Amet massa vitae tortor condimentum lacinia. Interdum velit
            euismod in pellentesque massa placerat duis ultricies lacus. Urna
            nunc id cursus metus aliquam eleifend mi in nulla. Mi bibendum neque
            egestas congue quisque. Nunc vel risus commodo viverra maecenas
            accumsan. Ridiculus mus mauris vitae ultricies leo integer
            malesuada. Quis viverra nibh cras pulvinar mattis nunc sed. Luctus
            accumsan tortor posuere ac ut consequat. Quis viverra nibh cras
            pulvinar. Tempus quam pellentesque nec nam aliquam sem et tortor.
            Iaculis nunc sed augue lacus viverra. Ut porttitor leo a diam.
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
            Facilisis gravida neque convallis a cras. Euismod quis viverra nibh
            cras pulvinar mattis nunc sed blandit. Proin nibh nisl condimentum
            id venenatis a condimentum. Nulla facilisi morbi tempus iaculis urna
            id volutpat. Ipsum faucibus vitae aliquet nec ullamcorper sit.
            Porttitor leo a diam sollicitudin tempor. Bibendum at varius vel
            pharetra vel turpis nunc eget lorem. Egestas fringilla phasellus
            faucibus scelerisque eleifend donec pretium vulputate sapien.
            Viverra suspendisse potenti nullam ac tortor vitae purus faucibus.
            Ac feugiat sed lectus vestibulum mattis. Fermentum leo vel orci
            porta non.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
            lorem dolor sed viverra ipsum nunc. Ultrices gravida dictum fusce ut
            placerat orci. Sit amet mauris commodo quis imperdiet massa
            tincidunt nunc. Dui faucibus in ornare quam viverra orci sagittis eu
            volutpat. Sagittis eu volutpat odio facilisis mauris sit amet massa
            vitae. Convallis tellus id interdum velit laoreet id donec ultrices.
            In est ante in nibh mauris. Volutpat odio facilisis mauris sit amet
            massa vitae. Cursus in hac habitasse platea dictumst quisque
            sagittis. Sagittis nisl rhoncus mattis rhoncus.
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
            <Text>Lorem ipsum</Text>
            <Text>Dolor sit amet consectetur</Text>
            <Text>Nunc tempor nisi scelarisque</Text>
            <AspectRatio w={'full'} ratio={16 / 9} mt={5}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.803802744042!2d21.40761576544506!3d42.004486029212316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13541443605aa4ab%3A0x33d56647e5b87264!2sFaculty%20of%20Computer%20Science%20%26%20Engineering!5e0!3m2!1sen!2smk!4v1687904474522!5m2!1sen!2smk" />
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
