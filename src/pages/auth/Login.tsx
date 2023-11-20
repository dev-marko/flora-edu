import feGreen from '@/styles/themes/feGreen';
import {
  Flex,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  ChakraProvider,
  FormErrorMessage,
  Divider,
  AbsoluteCenter,
} from '@chakra-ui/react';

import { color, useColorModeValue, useTheme } from '@chakra-ui/system';
import { Field, Formik, FormikHelpers, FormikProps } from 'formik';
import { Facebook, Google } from 'react-bootstrap-icons';

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const theme = useTheme();

  const validateUsername = (username: string) => {
    let error;
    if (!username) {
      error = 'Корисничко име е задолжително';
    }
    return error;
  };

  const validatePassword = (password: string) => {
    let error;
    if (!password) {
      error = 'Лозинка е задолжителна';
    }
    return error;
  };

  const initialValues: LoginFormInputs = {
    username: '',
    password: '',
  };

  return (
    <ChakraProvider>
      <Flex
        w={'full'}
        h={'full'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading
                as="h2"
                size="3xl"
                fontFamily={'Yeseva One'}
                fontWeight={'400'}
                color={'black'}
              >
                ФлораЕду
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }} fontFamily={'Inter'}>
                Добредојдовте во светот на растенијата 🌳
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Formik
                initialValues={initialValues}
                onSubmit={async () => {
                  console.log('alo');
                }}
              >
                {(props: FormikProps<LoginFormInputs>) => (
                  <Stack spacing={4}>
                    <Field name="username" validate={validateUsername}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <FormLabel
                            fontFamily={'Inter'}
                            fontWeight={'semibold'}
                          >
                            Корисничко име
                          </FormLabel>
                          <Input
                            {...field}
                            fontFamily={'Inter'}
                            type="text"
                            name="username"
                            placeholder="Вашето корисничко име..."
                            autoComplete="off"
                          />
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password" validate={validatePassword}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel
                            fontFamily={'Inter'}
                            fontWeight={'semibold'}
                          >
                            Лозинка
                          </FormLabel>
                          <Input
                            {...field}
                            fontFamily={'Inter'}
                            type="password"
                            name="password"
                            placeholder="Вашето тајна лозинка..."
                            autoComplete="off"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Stack spacing={8}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                      >
                        <Checkbox
                          colorScheme={'green'}
                          fontFamily={'Inter'}
                          size={{ base: 'md', md: 'sm' }}
                        >
                          Запомни ме
                        </Checkbox>
                        <Text
                          color={'black'}
                          fontFamily={'Inter'}
                          fontSize={'sm'}
                          decoration={'underline'}
                        >
                          Заборавена лозинка?
                        </Text>
                      </Stack>
                      <Button
                        color={'white'}
                        bgColor={feGreen.colors.primary[400]}
                        _hover={{
                          bg: feGreen.colors.primary[500],
                        }}
                      >
                        Најави се
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Formik>
              <Flex
                my={'5'}
                flexDir={'column'}
                align={'center'}
                justify={'center'}
                lineHeight={'1'}
              >
                <Text fontFamily={'Inter'} fontSize={'sm'}>
                  Немате кориснички профил?
                </Text>
                <Text fontFamily={'Inter'} fontSize={'sm'}>
                  Кликнете тука за да се регистрирате!
                </Text>
              </Flex>
              <Box position="relative" padding="3">
                <Divider borderColor={'gray'} />
                <AbsoluteCenter bg="white" px="4">
                  <Text fontFamily={'Inter'} fontSize={'sm'}>
                    или
                  </Text>
                </AbsoluteCenter>
              </Box>
              <Flex
                mt={'5'}
                gap={2}
                flexDir={'column'}
                align={'center'}
                justify={'center'}
              >
                <Button w={'full'} leftIcon={<Facebook />}>
                  Најави се преку Google
                </Button>
                <Button w={'full'} leftIcon={<Google />}>
                  Најави се преку Facebook
                </Button>
              </Flex>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
