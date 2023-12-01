import { ErrorCodes } from '@/enums/error-codes';
import { RegisterRequest } from '@/interfaces/auth/register-request';
import { CustomAxiosError } from '@/interfaces/error/custom-axios-error';
import { ProblemDetails } from '@/interfaces/error/problem-details';
import useAuthService from '@/hooks/services/useAuthService';
import feGreen from '@/styles/themes/feGreen';
import errorCodeMessages from '@/utils/error-code-translator';
import {
  Flex,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  ChakraProvider,
  FormErrorMessage,
  Divider,
  AbsoluteCenter,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';

import { useColorModeValue } from '@chakra-ui/system';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Facebook, Google } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

type RegisterFormInputs = {
  username: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const authService = useAuthService();

  const validateUsername = (username: string) => {
    let error;
    if (!username) {
      error = 'Корисничко име е задолжително';
    }
    return error;
  };

  const validateEmail = (emailAddress: string) => {
    let error;
    if (!emailAddress) {
      error = 'Е-пошта е задолжителна';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress)
    ) {
      error = 'Невалидна е-пошта';
    }
    return error;
  };

  const validatePassword = (password: string) => {
    let error;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!password) {
      error = 'Лозинка е задолжителна';
    } else if (password.length < 8) {
      error = 'Лозинката мора да е долга најмалку 8 карактери';
    } else if (!passwordRegex.test(password)) {
      error = 'Лозинката мора да содржи најмалку една бројка и голема буква';
    }
    return error;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    let error;

    if (!confirmPassword) {
      return 'Потврди лозинка';
    }

    if (password !== confirmPassword) {
      error = 'Лозинките не се совпаѓаат';
    }

    return error;
  };

  const initialValues: RegisterFormInputs = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    name: '',
    surname: '',
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
          <Stack
            spacing={8}
            mx={'auto'}
            w={{ base: 'sm', md: 'xl' }}
            py={6}
            px={6}
          >
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
              <Text fontSize={'sm'} fontFamily={'Inter'}>
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
                onSubmit={(
                  values: RegisterFormInputs,
                  {
                    setSubmitting,
                    resetForm,
                  }: FormikHelpers<RegisterFormInputs>
                ) => {
                  const registerRequest: RegisterRequest = {
                    firstName: values.name?.trimStart().trimEnd(),
                    lastName: values.surname?.trimStart().trimEnd(),
                    username: values.username.trimStart().trimEnd(),
                    email: values.email.trimStart().trimEnd(),
                    password: values.password.trimStart().trimEnd(),
                  };

                  authService
                    .register(registerRequest)
                    .then(() => {
                      setSubmitting(false);
                      resetForm();
                      navigate('/login', { replace: true });
                    })
                    .catch((error: CustomAxiosError) => {
                      const statusCode = error.axiosError.response?.status;
                      const problemDetails = error.axiosError.response
                        ?.data as ProblemDetails;
                      const errorCode: ErrorCodes =
                        ErrorCodes[
                          problemDetails.title as keyof typeof ErrorCodes
                        ];

                      if (statusCode === 409) {
                        toast({
                          title: 'Настаната грешка.',
                          description: errorCodeMessages.get(errorCode),
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        });
                      } else if (statusCode === 500) {
                        toast({
                          title: 'Настаната грешка.',
                          description: errorCodeMessages.get(errorCode),
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        });
                      } else {
                        error.handleGlobally && error.handleGlobally();
                      }
                      setSubmitting(false);
                    });
                }}
              >
                {({
                  isSubmitting,
                  values,
                }: FormikProps<RegisterFormInputs>) => (
                  <Form>
                    <Stack spacing={4}>
                      <Field name="username" validate={validateUsername}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.username && form.touched.username
                            }
                          >
                            <FormLabel
                              fontSize={'sm'}
                              fontFamily={'Inter'}
                              fontWeight={'semibold'}
                            >
                              Корисничко име
                            </FormLabel>
                            <Input
                              {...field}
                              size={'sm'}
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
                      <Field name="email" validate={validateEmail}>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel
                              fontSize={'sm'}
                              fontFamily={'Inter'}
                              fontWeight={'semibold'}
                            >
                              Е-пошта
                            </FormLabel>
                            <Input
                              {...field}
                              size={'sm'}
                              fontFamily={'Inter'}
                              type="email"
                              name="email"
                              placeholder="Вашата е-пошта..."
                              autoComplete="off"
                            />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="name">
                        {({ field }: any) => (
                          <FormControl>
                            <FormLabel
                              fontSize={'sm'}
                              fontFamily={'Inter'}
                              fontWeight={'semibold'}
                            >
                              Име
                            </FormLabel>
                            <Input
                              {...field}
                              size={'sm'}
                              fontFamily={'Inter'}
                              type="text"
                              name="name"
                              placeholder="Вашето име..."
                              autoComplete="off"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="surname">
                        {({ field }: any) => (
                          <FormControl>
                            <FormLabel
                              fontSize={'sm'}
                              fontFamily={'Inter'}
                              fontWeight={'semibold'}
                            >
                              Презиме
                            </FormLabel>
                            <Input
                              {...field}
                              size={'sm'}
                              fontFamily={'Inter'}
                              type="text"
                              name="surname"
                              placeholder="Вашето презиме..."
                              autoComplete="off"
                            />
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
                              fontSize={'sm'}
                              fontFamily={'Inter'}
                              fontWeight={'semibold'}
                            >
                              Лозинка
                            </FormLabel>
                            <Input
                              {...field}
                              size={'sm'}
                              fontFamily={'Inter'}
                              type="password"
                              name="password"
                              placeholder="Вашата тајна лозинка..."
                              autoComplete="off"
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field
                        name="confirmPassword"
                        validate={(value: string) =>
                          validateConfirmPassword(values.password, value)
                        }
                      >
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.confirmPassword &&
                              form.touched.confirmPassword
                            }
                          >
                            <FormLabel
                              fontSize={'sm'}
                              fontFamily={'Inter'}
                              fontWeight={'semibold'}
                            >
                              Потврдете лозинка
                            </FormLabel>
                            <Input
                              {...field}
                              size={'sm'}
                              fontFamily={'Inter'}
                              type="password"
                              name="confirmPassword"
                              placeholder="Потврди лозинка..."
                              autoComplete="off"
                            />
                            <FormErrorMessage>
                              {form.errors.confirmPassword}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Stack spacing={8}>
                        <Button
                          color={'white'}
                          bgColor={feGreen.colors.primary[400]}
                          _hover={{
                            bg: feGreen.colors.primary[500],
                          }}
                          isLoading={isSubmitting}
                          type="submit"
                        >
                          Регистрирај се
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
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
                  Веќе имате кориснички профил?
                </Text>
                <Text mt={1} fontFamily={'Inter'} fontSize={'sm'}>
                  Кликнете
                  <ChakraLink color={feGreen.colors.primary[500]}>
                    <Link to="/login"> тука </Link>
                  </ChakraLink>
                  за да се најавите!
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

export default Register;
