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
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { Facebook, Google } from 'react-bootstrap-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import feGreen from '@/styles/themes/feGreen';
import authService from '@/services/auth-service';
import errorCodeMessages from '@/utils/error-code-translator';
import { JWT_TOKEN_KEY } from '@/constants/local-storage-keys';
import { ErrorCodes } from '@/enum/error-codes';
import { ProblemDetails } from '@/interfaces/error/problem-details';
import { LoginRequest } from '@/interfaces/auth/login-request';
import { CustomAxiosError } from '@/interfaces/error/custom-axios-error';
import useUserStore from '@/stores/useUserStore';
import useLocalStorage from '@/hooks/useLocalStorage';

type LoginFormInputs = {
  username: string;
  password: string;
};

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);

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
          <Stack
            spacing={8}
            mx={'auto'}
            w={{ base: 'sm', md: 'xl' }}
            py={12}
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
                onSubmit={(
                  values: LoginFormInputs,
                  { setSubmitting, resetForm }: FormikHelpers<LoginFormInputs>
                ) => {
                  const loginRequest: LoginRequest = {
                    username: values.username.trimStart().trimEnd(),
                    password: values.password.trimStart().trimEnd(),
                  };

                  authService
                    .login(loginRequest)
                    .then((response) => {
                      const data = response.data;
                      localStorage.setItem(JWT_TOKEN_KEY, data.accessToken);
                      setUser(data.userInfo);
                      setSubmitting(false);
                      resetForm();
                      const redirectPath =
                        searchParams.get('redirectTo') || '/';
                      navigate(redirectPath, { replace: true });
                    })
                    .catch((error: CustomAxiosError) => {
                      const statusCode = error.axiosError.response?.status;
                      const problemDetails = error.axiosError.response
                        ?.data as ProblemDetails;
                      const errorCode: ErrorCodes =
                        ErrorCodes[
                          problemDetails.title as keyof typeof ErrorCodes
                        ];

                      if (statusCode === 404) {
                        toast({
                          title: 'Настаната грешка.',
                          description: errorCodeMessages.get(errorCode),
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        });
                      } else if (statusCode === 400) {
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
                {({ isSubmitting }: FormikProps<LoginFormInputs>) => (
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
                              placeholder="Вашата тајна лозинка..."
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
                          isLoading={isSubmitting}
                          type="submit"
                        >
                          Најави се
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
                  Немате кориснички профил?
                </Text>
                <Text mt={1} fontFamily={'Inter'} fontSize={'sm'}>
                  Кликнете
                  <ChakraLink color={feGreen.colors.primary[500]}>
                    <Link to="/register"> тука </Link>
                  </ChakraLink>
                  за да се регистрирате!
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
