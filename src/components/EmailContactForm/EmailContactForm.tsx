import {
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputLeftElement,
  Textarea,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';

import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';

import {
  UserIcon,
  EnvelopeIcon,
  Bars3BottomLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

import emailjs from '@emailjs/browser';

type EmailFormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EmailContactForm = () => {
  const validateName = (name: string) => {
    let error;
    if (!name) {
      error = 'Вашето име е задолжително';
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

  const validateSubject = (subject: string) => {
    let error;
    if (!subject) {
      error = 'Наслов е задолжителен';
    }
    return error;
  };

  const validateMessage = (message: string) => {
    let error;
    if (!message) {
      error = 'Содржина на порака е задолжителна';
    }
    return error;
  };

  const {
    isOpen: success,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const initialValues: EmailFormInputs = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  return (
    <>
      {success && (
        <Alert
          display={'flex'}
          flexDirection={'row'}
          alignContent={'center'}
          justifyContent={'space-between'}
          status="success"
          mb={2}
          borderRadius={'lg'}
        >
          <AlertIcon />
          <Box textAlign={'center'}>
            <AlertTitle>Пратено! 🚀</AlertTitle>
            <AlertDescription>Очекувајте наш одговор наскоро.</AlertDescription>
          </Box>
          <CloseButton
            alignSelf="center"
            position="relative"
            onClick={onClose}
          />
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: EmailFormInputs,
          { setSubmitting, resetForm }: FormikHelpers<EmailFormInputs>
        ) => {
          try {
            await emailjs.send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
              values,
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSubmitting(false);
            resetForm();
            onOpen();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {(props: FormikProps<EmailFormInputs>) => (
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  mb={4}
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={UserIcon} boxSize={6} />
                    </InputLeftElement>
                    <Input
                      {...field}
                      type="text"
                      name="name"
                      placeholder="Вашето име..."
                      autoComplete="off"
                      focusBorderColor="primary.300"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  mb={4}
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={EnvelopeIcon} boxSize={6} />
                    </InputLeftElement>
                    <Input
                      {...field}
                      type="email"
                      name="email"
                      placeholder="Вашата е-пошта..."
                      autoComplete="off"
                      focusBorderColor="primary.300"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="subject" validate={validateSubject}>
              {({ field, form }: any) => (
                <FormControl
                  mb={4}
                  isInvalid={form.errors.subject && form.touched.subject}
                >
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={Bars3BottomLeftIcon} boxSize={6} />
                    </InputLeftElement>
                    <Input
                      {...field}
                      type="text"
                      name="subject"
                      placeholder="Наслов на пораката..."
                      autoComplete="off"
                      focusBorderColor="primary.300"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.subject}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="message" validate={validateMessage} as="textarea">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.message && form.touched.message}
                >
                  <Textarea
                    {...field}
                    name="message"
                    placeholder="Содржина на вашата порака..."
                    rows={6}
                    resize="none"
                    focusBorderColor="primary.300"
                  />
                  <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={8} isLoading={props.isSubmitting} type="submit">
              <Icon as={PaperAirplaneIcon} mr={2} boxSize={6} />
              Испрати
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EmailContactForm;
