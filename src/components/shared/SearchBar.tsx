import { SearchBarInput } from '@/data/formik-types/search-input';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  Button,
} from '@chakra-ui/react';
import { Formik, FormikHelpers, FormikProps, Field } from 'formik';
import {} from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  createSearchParams,
  Form,
  useNavigate,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom';

type SearchBarProps = {
  placeholderText: string;
};

const SearchBar = ({ placeholderText }: SearchBarProps) => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const initialValues: SearchBarInput = {
    searchTerm: '',
  };

  const [formValues, setformValues] = useState(initialValues);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (formValues.searchTerm === '') {
      searchParams.delete('searchTerm');
      setSearchParams(searchParams);
      revalidator.revalidate();
    }
  }, [formValues]);

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          value: SearchBarInput,
          { setSubmitting }: FormikHelpers<SearchBarInput>
        ) => {
          if (value.searchTerm !== '') {
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
                        placeholder={placeholderText}
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
  );
};

export default SearchBar;
