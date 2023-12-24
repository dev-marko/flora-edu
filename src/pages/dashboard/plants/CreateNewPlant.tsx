import DashboardApi from '@/apis/dashboard-api';
import {
  blobStorageBaseUrl,
  plantHeaderImagesContainer,
  plantThumbnailsContainer,
} from '@/data/constants/azure-blob-storage';
import { PlantTypesSelect } from '@/data/constants/plant-types-select';
import { PlantTypeEnum } from '@/data/enums/plant-type-enum';
import { PlantEditDto } from '@/data/interfaces/plant-edit-dto';
import { convertFileToArrayBuffer } from '@/utils/convert-file-to-array-buffer';
import { renameFileToUuid } from '@/utils/rename-file-to-uuid';
import { BlockBlobClient } from '@azure/storage-blob';
import {
  Button,
  Input,
  Textarea,
  VStack,
  Text,
  Select,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { ChangeEvent, useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const NewPlantSchema = Yup.object().shape({
  name: Yup.string().required('Задолжително поле.'),
  description: Yup.string()
    .min(500, 'Минимум 500 карактери.')
    .required('Задолжително поле.'),
  predispositions: Yup.string()
    .min(500, 'Минимум 500 карактери.')
    .required('Задолжително поле.'),
  planting: Yup.string()
    .min(500, 'Минимум 500 карактери.')
    .required('Задолжително поле.'),
  maintenance: Yup.string()
    .min(500, 'Минимум 500 карактери.')
    .required('Задолжително поле.'),
});

const initialValues = {
  name: '',
  description: '',
  type: '',
  thumbnailImageUrl: '',
  headerImageUrl: '',
  predispositions: '',
  planting: '',
  maintenance: '',
};

const CreateNewPlant = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [currType, setCurrType] = useState(PlantTypeEnum.Unknown);
  const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(
    null
  );
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);

  const handleFileSelection = (
    event: ChangeEvent<HTMLInputElement>,
    containerName: string
  ) => {
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

    switch (containerName) {
      case plantThumbnailsContainer:
        setThumbnailImageFile(renamedFile);
        break;
      case plantHeaderImagesContainer:
        setHeaderImageFile(renamedFile);
        break;
    }
  };

  const handleThumbnailImageUpload = async () => {
    let sasToken;
    if (thumbnailImageFile !== null) {
      sasToken = (
        await DashboardApi.getPlantThumbnailImagesSasToken(
          thumbnailImageFile.name!
        )
      ).data;
    }

    if (sasToken === '') return;

    try {
      const fileArrayBuffer = await convertFileToArrayBuffer(
        thumbnailImageFile as File
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
      console.log('thumbnail', res);
      const imageUrl = `https://${blobStorageBaseUrl}/${plantThumbnailsContainer}/${thumbnailImageFile?.name}`;
      return imageUrl;
    } catch (error) {
      console.error({ 'Error:': error });
      showImageUploadErrorToast();
    }
  };

  const handleHeaderImageUpload = async () => {
    let sasToken;
    if (headerImageFile !== null) {
      sasToken = (
        await DashboardApi.getPlantHeaderImagesSasToken(headerImageFile.name!)
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
      console.log('header', res);
      const imageUrl = `https://${blobStorageBaseUrl}/${plantHeaderImagesContainer}/${headerImageFile?.name}`;
      return imageUrl;
    } catch (error) {
      console.error('Error message:', error);
      showImageUploadErrorToast();
    }
  };

  const showImageUploadErrorToast = () => {
    toast({
      title: 'Грешка',
      description: 'Грешка при прикачување на сликите, обидете се повторно.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <VStack align={'start'} spacing={8} p={5}>
        <Button leftIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
          Назад
        </Button>

        <Formik
          initialValues={initialValues}
          validationSchema={NewPlantSchema}
          onSubmit={async (values: any, { setSubmitting, resetForm }) => {
            const thumbnailUrlTest = await handleThumbnailImageUpload();
            const headerUrlTest = await handleHeaderImageUpload();

            let thumbnailUrl;
            let headerUrl;

            if (thumbnailUrlTest && headerUrlTest) {
              thumbnailUrl = thumbnailUrlTest;
              headerUrl = headerUrlTest;
            }

            const plantToEdit: PlantEditDto = {
              name: values.name,
              description: values.description,
              type: currType.toString(),
              thumbnailImageUrl: thumbnailUrl!,
              headerImageUrl: headerUrl!,
              predispositions: values.predispositions,
              planting: values.planting,
              maintenance: values.maintenance,
              isNew: true,
            };

            DashboardApi.updatePlant(plantToEdit)
              .then(() => {
                toast({
                  colorScheme: 'primary',
                  title: 'Успех',
                  description: 'Успешно зачувано ново растение!',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
                setSubmitting(false);
                resetForm();
                setThumbnailImageFile(null);
                setHeaderImageFile(null);
              })
              .catch(() => {
                toast({
                  title: 'Неуспех',
                  description: 'Неуспешна операција за креирање ново растение!',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form style={{ width: '100%' }}>
              <VStack align={'start'} w={'full'} spacing={8}>
                <VStack align={'start'} w={'16em'}>
                  <Text fontWeight={'bold'}>Thumbnail слика:</Text>
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
                    onChange={(event) =>
                      handleFileSelection(event, plantThumbnailsContainer)
                    }
                  />
                </VStack>
                <VStack align={'start'} w={'16em'}>
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
                    onChange={(event) =>
                      handleFileSelection(event, plantHeaderImagesContainer)
                    }
                  />
                </VStack>
                <VStack align={'Start'}>
                  <Field name="name">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel fontWeight={'bold'}>Име:</FormLabel>
                        <Input
                          {...field}
                          name="name"
                          type="text"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          focusBorderColor={'primary.300'}
                          autoComplete={'off'}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <VStack align={'Start'} w={'16em'}>
                  <Text fontWeight={'bold'}>Вид:</Text>
                  <Select
                    bgColor={'white'}
                    boxShadow={'sm'}
                    value={currType}
                    onChange={(event) => setCurrType(+event.target.value)}
                    cursor={'pointer'}
                    focusBorderColor={'primary.300'}
                  >
                    <option disabled value={PlantTypeEnum.Unknown}>
                      (Одберете вид)
                    </option>
                    {PlantTypesSelect.map((type) => {
                      return (
                        <option key={type.value} value={type.value}>
                          {type.displayName}
                        </option>
                      );
                    })}
                  </Select>
                </VStack>
                <VStack align={'Start'} w={'full'}>
                  <Field name="description">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel fontWeight={'bold'}>Опис:</FormLabel>
                        <Textarea
                          {...field}
                          name="description"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          h={'20em'}
                          resize={'none'}
                          focusBorderColor="primary.300"
                        ></Textarea>
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <VStack align={'Start'} w={'full'}>
                  <Field name="predispositions">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.predispositions &&
                          form.touched.predispositions
                        }
                      >
                        <FormLabel fontWeight={'bold'}>Предуслови:</FormLabel>
                        <Textarea
                          {...field}
                          name="predispositions"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          h={'20em'}
                          resize={'none'}
                          focusBorderColor="primary.300"
                        ></Textarea>
                        <FormErrorMessage>
                          {form.errors.predispositions}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <VStack align={'Start'} w={'full'}>
                  <Field name="planting">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.planting && form.touched.planting
                        }
                      >
                        <FormLabel fontWeight={'bold'}>Садење:</FormLabel>
                        <Textarea
                          {...field}
                          name="planting"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          h={'20em'}
                          resize={'none'}
                          focusBorderColor="primary.300"
                        ></Textarea>
                        <FormErrorMessage>
                          {form.errors.planting}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <VStack align={'Start'} w={'full'}>
                  <Field name="maintenance">
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.maintenance && form.touched.maintenance
                        }
                      >
                        <FormLabel fontWeight={'bold'}>Одржување:</FormLabel>
                        <Textarea
                          {...field}
                          name="maintenance"
                          bgColor={'white'}
                          boxShadow={'sm'}
                          h={'20em'}
                          resize={'none'}
                          focusBorderColor="primary.300"
                        ></Textarea>
                        <FormErrorMessage>
                          {form.errors.maintenance}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                >
                  Зачувај
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </VStack>
    </>
  );
};

export default CreateNewPlant;
