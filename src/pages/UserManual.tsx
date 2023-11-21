import {
  Container,
  Divider,
  Flex,
  Heading,
  VStack,
  Text,
  Icon,
  useTheme,
  useColorModeValue,
  HStack,
  UnorderedList,
  ListItem,
  Hide,
} from '@chakra-ui/react';
import { InfoCircleFill } from 'react-bootstrap-icons';

const UserManual = () => {
  const theme = useTheme();

  const bgColor = useColorModeValue(
    theme.colors.primary[100],
    theme.colors.gray[700]
  );

  return (
    <Container
      maxW={'container.xl'}
      my={{ base: 3, md: 5 }}
      mx={{ base: 0, md: 3 }}
      p={5}
      bg={bgColor}
      rounded={'lg'}
    >
      <Flex flexDir={'column'} align={'center'} justify={'center'} gap={3}>
        <VStack w={'full'}>
          <Heading as="h2" size="xl" textAlign={{ base: 'center' }}>
            Кратко упатство за употреба
          </Heading>
          <Divider borderColor={'black'} />
        </VStack>
        <HStack>
          <Hide below="sm">
            <Icon as={InfoCircleFill} />
          </Hide>
          <Text textAlign={{ base: 'center' }}>
            Ова претставува кратко упатство кое служи за да ве воведе во
            главните функционалности на страницата.
          </Text>
        </HStack>
        <VStack align={'start'} spacing={{ base: 4, md: 8 }}>
          <VStack align={'start'}>
            <Heading as="h3" size="md">
              1. Сите растенија
            </Heading>
            <Text>
              Во делот "Сите растенија" можете да ги најдете сите видови на
              растенија. Откако ќе ја изберете посакуваната категорија на
              растение, ќе ви биде прикажана листа од растенија кои припаѓаат на
              соодветната категорија.
            </Text>
          </VStack>
          <VStack align={'start'}>
            <Heading as="h4" size="md">
              2. Конкретно растение
            </Heading>
            <Text>
              Откако ќе го пронајдете соодветното растение од бараната
              категорија, ќе ви бидат прикажани следните информации:
            </Text>
            <UnorderedList>
              <ListItem>Опис - краток опис за растението.</ListItem>
              <ListItem>
                Предуслови - потребни предуслови кои треба да се задоволат пред
                да го садите растението. Потребен алат, место за садење,
                супстрат итн.
              </ListItem>
              <ListItem>Садење - упатство како се сади растението.</ListItem>
              <ListItem>
                Одржување - совети како треба да се одржува растението и
                потребни ресурси доколку постојат.
              </ListItem>
            </UnorderedList>
          </VStack>
          <VStack align={'start'}>
            <Heading as="h4" size="md">
              3. Блог и статии
            </Heading>
            <Text>
              Во делот "Блог" можете да читате различни статии напишани од
              нашиот тим.
            </Text>
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export default UserManual;
