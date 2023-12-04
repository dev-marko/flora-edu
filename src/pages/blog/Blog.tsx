import {
  Box,
  Button,
  Stack,
  VStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  useColorModeValue,
  FormControl,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import CustomDivider from '@/components/shared/CustomDivider';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import { SearchBarInput } from '@/data/formik-types/search-input';
import {
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
  useFormikContext,
} from 'formik';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Blog = () => {
  const navigate = useNavigate();
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  const initialValues: SearchBarInput = {
    searchTerm: '',
  };

  const [formValues, setformValues] = useState(initialValues);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.size > 0 && formValues.searchTerm === '') {
      navigate('/blog');
    }
  }, [formValues, searchParams, navigate]);

  return (
    <>
      <Breadcrumbs />
      <VStack align={'start'} mt={{ base: 0, md: 5 }}>
        <Stack
          w={'full'}
          justify={'space-between'}
          direction={['column', 'row']}
        >
          <Heading>Блог</Heading>
          <Box>
            <Formik
              initialValues={initialValues}
              onSubmit={(
                value: SearchBarInput,
                { setSubmitting }: FormikHelpers<SearchBarInput>
              ) => {
                if (value.searchTerm !== '') {
                  console.log('alo');
                  navigate({
                    pathname: '.',
                    search: createSearchParams({
                      searchTerm: value.searchTerm.trimStart().trimEnd(),
                    }).toString(),
                  });
                }
                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting }: FormikProps<SearchBarInput>) => {
                setformValues(values);
                return (
                  <Form>
                    <Field name="searchTerm">
                      {({ field }: any) => (
                        <FormControl>
                          <InputGroup size={['sm', 'md']}>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<SearchIcon />}
                            />
                            <Input
                              {...field}
                              name="searchTerm"
                              fontFamily={'Inter'}
                              type="text"
                              placeholder="Пребарај статија..."
                              autoComplete={'off'}
                              focusBorderColor="primary.300"
                            />
                            <InputRightAddon p={0} border="none">
                              <Button
                                size={['sm', 'md']}
                                borderLeftRadius={0}
                                isLoading={isSubmitting}
                                type="submit"
                              >
                                Пребарај
                              </Button>
                            </InputRightAddon>
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Stack>
        <CustomDivider dividerColor={dividerColor} />
        <ArticlesList />
      </VStack>
    </>
  );
};

export default Blog;
