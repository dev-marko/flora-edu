import DashboardApi from '@/apis/dashboard-api';
import CustomH1 from '@/components/custom-markdown/CustomH1';
import CustomH2 from '@/components/custom-markdown/CustomH2';
import CustomH3 from '@/components/custom-markdown/CustomH3';
import CustomH4 from '@/components/custom-markdown/CustomH4';
import CustomH5 from '@/components/custom-markdown/CustomH5';
import CustomH6 from '@/components/custom-markdown/CustomH6';
import {
  articleHeaderImagesContainer,
  blobStorageBaseUrl,
} from '@/data/constants/azure-blob-storage';
import { Article } from '@/data/interfaces/article';
import { ArticleEditDto } from '@/data/interfaces/article-edit-dto';
import { convertFileToArrayBuffer } from '@/utils/convert-file-to-array-buffer';
import { renameFileToUuid } from '@/utils/rename-file-to-uuid';
import { BlockBlobClient } from '@azure/storage-blob';
import {
  Box,
  Flex,
  Input,
  ListItem,
  OrderedList,
  Textarea,
  UnorderedList,
  VStack,
  Text,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const ArticleEditorSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Минимум 10 карактери.')
    .required('Задолжително поле.'),
  subtitle: Yup.string()
    .min(10, 'Минимум 10 карактери.')
    .required('Задолжително поле.'),
  shortDescription: Yup.string()
    .min(100, 'Минимум 100 карактери.')
    .required('Задолжително поле.'),
  content: Yup.string()
    .min(200, 'Минимум 200 карактери.')
    .required('Задолжително поле.'),
});

const ArticleEditor = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { articleId } = useParams();

  const [, setArticleToEdit] = useState<ArticleEditDto | null>(null);
  const [markdown, setMarkdown] = useState('...прегледај ја содржината!');
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
  const [initialValues, setInitialValues] = useState({
    title: '',
    subtitle: '',
    shortDescription: '',
    content: '',
  });

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
    async function fetchArticle() {
      const res: Article = (await DashboardApi.getArticleById(articleId)).data;
      const articleEditDto: ArticleEditDto = {
        id: articleId,
        title: res.title,
        subtitle: res.subtitle,
        shortDescription: res.shortDescription,
        headerImageUrl: res.headerImageUrl,
        content: res.content,
        isNew: false,
      };
      setArticleToEdit(articleEditDto);
      setInitialValues({
        title: articleEditDto.title,
        subtitle: articleEditDto.subtitle,
        shortDescription: articleEditDto.shortDescription,
        content: articleEditDto.content,
      });
      setMarkdown(res.content);
    }
  }, []);

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (!(target instanceof HTMLInputElement)) return;
    if (
      target?.files === null ||
      target?.files?.length === 0 ||
      target?.files?.length >= 5000000 ||
      target?.files[0] === null
    ) {
      toast({
        title: 'Грешка',
        description: 'Ве молиме обидете се повторно (големина на слика <5MB)',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const renamedFile = renameFileToUuid(target?.files[0]);
    setHeaderImageFile(renamedFile);
  };

  const handleHeaderImageUpload = async () => {
    let sasToken;
    if (headerImageFile !== null) {
      sasToken = (
        await DashboardApi.getArticleHeaderImagesSasToken(headerImageFile.name!)
      ).data;
    }

    if (sasToken === '') return;

    try {
      const fileArrayBuffer = await convertFileToArrayBuffer(
        headerImageFile as File
      );
      const blockBlobClient = new BlockBlobClient(sasToken);

      if (
        fileArrayBuffer === null ||
        fileArrayBuffer.byteLength < 1 ||
        fileArrayBuffer.byteLength > 256000
      ) {
        showImageUploadErrorToast();
        return;
      }
      const res = await blockBlobClient.uploadData(fileArrayBuffer);
      const imageUrl = `https://${blobStorageBaseUrl}/${articleHeaderImagesContainer}/${headerImageFile?.name}`;
      return imageUrl;
    } catch (error) {
      console.error('Error message:', error);
      showImageUploadErrorToast();
    }
  };

  const showImageUploadErrorToast = () => {
    toast({
      title: 'Грешка',
      description: 'Грешка при прикачување на сликата, обидете се повторно.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack align={'start'} spacing={8} p={5}>
      <Button leftIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
        Назад
      </Button>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ArticleEditorSchema}
        onSubmit={async (values: any, { setSubmitting, resetForm }) => {
          const headerUrlTest = await handleHeaderImageUpload();

          let headerUrl;

          if (headerUrlTest) {
            headerUrl = headerUrlTest;
          }

          const articleToEdit: ArticleEditDto = {
            id: articleId,
            title: values.title,
            subtitle: values.subtitle,
            shortDescription: values.shortDescription,
            headerImageUrl: headerUrl!,
            content: values.content,
            isNew: articleId === undefined ? true : false,
          };

          DashboardApi.updateArticle(articleToEdit)
            .then(() => {
              toast({
                colorScheme: 'primary',
                title: 'Успех',
                description:
                  articleId === undefined
                    ? 'Успешно објавена нова статија!'
                    : 'Успешно зачувани промени!',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              setSubmitting(false);
              resetForm();
              setHeaderImageFile(null);
            })
            .catch(() => {
              toast({
                title: 'Неуспех',
                description:
                  articleId === undefined
                    ? 'Неуспешна операција за креирање ново растение!'
                    : 'Неуспешна операција за промена на статија!',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, isValid, values }) => {
          setMarkdown(values.content);
          return (
            <Form style={{ width: '100%' }}>
              <VStack align={'start'} w={'full'} spacing={8}>
                <VStack align={'start'} w={'25%'}>
                  <Text fontWeight={'bold'}>Насловна слика:</Text>
                  <Input
                    bgColor={'white'}
                    boxShadow={'sm'}
                    type="file"
                    accept="image/*"
                    sx={{
                      '::file-selector-button': {
                        height: 10,
                        padding: 0,
                        mr: 4,
                        background: 'none',
                        border: 'none',
                        fontWeight: 'bold',
                      },
                    }}
                    onChange={(event) => handleFileSelection(event)}
                  />
                </VStack>
                <VStack align={'start'} w={'50%'}>
                  <Field name="title">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel fontWeight={'bold'}>Наслов:</FormLabel>
                        <Input
                          {...field}
                          name="title"
                          type="text"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          focusBorderColor={'primary.300'}
                          autoComplete={'off'}
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <VStack align={'start'} w={'50%'}>
                  <Field name="subtitle">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.subtitle && form.touched.subtitle
                        }
                      >
                        <FormLabel fontWeight={'bold'}>Поднаслов:</FormLabel>
                        <Input
                          {...field}
                          name="subtitle"
                          type="text"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          focusBorderColor={'primary.300'}
                          autoComplete={'off'}
                        />
                        <FormErrorMessage>
                          {form.errors.subtitle}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <VStack align={'start'} w={'full'}>
                  <Field name="shortDescription">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.shortDescription &&
                          form.touched.shortDescription
                        }
                      >
                        <FormLabel fontWeight={'bold'}>Краток опис:</FormLabel>
                        <Textarea
                          {...field}
                          name="shortDescription"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          h={'12em'}
                          resize={'none'}
                          focusBorderColor="primary.300"
                        ></Textarea>
                        <FormErrorMessage>
                          {form.errors.shortDescription}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>

                <VStack align={'start'} w={'full'}>
                  <FormLabel fontWeight={'bold'}>Содржина:</FormLabel>
                  <Flex
                    w={'full'}
                    align={'start'}
                    justify={'space-between'}
                    gap={8}
                  >
                    <Box flex={1} h={'95vh'}>
                      <Field name="content">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.content && form.touched.content
                            }
                          >
                            <Textarea
                              {...field}
                              h={'95vh'}
                              resize={'none'}
                              bgColor={'white'}
                              boxShadow={'sm'}
                              rounded={'lg'}
                              focusBorderColor={'primary.300'}
                              placeholder="Внеси текст тука..."
                            ></Textarea>
                            <FormErrorMessage>
                              {form.errors.content}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box
                      flex={1}
                      h={'95vh'}
                      bgColor={'white'}
                      boxShadow={'sm'}
                      rounded={'lg'}
                      p={4}
                      overflowY={'scroll'}
                    >
                      <Markdown
                        components={{
                          h1: CustomH1,
                          h2: CustomH2,
                          h3: CustomH3,
                          h4: CustomH4,
                          h5: CustomH5,
                          h6: CustomH6,
                          ol: OrderedList,
                          ul: UnorderedList,
                          li: ListItem,
                        }}
                      >
                        {markdown}
                      </Markdown>
                    </Box>
                  </Flex>
                </VStack>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                >
                  {articleId === undefined ? 'Објави' : 'Зачувај'}
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </VStack>
  );
};

export default ArticleEditor;
