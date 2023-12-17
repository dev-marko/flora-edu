import DashboardApi from '@/apis/dashboard-api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { PlantTypesSelect } from '@/data/constants/plant-types-select';
import { PlantTypeEnum } from '@/data/enums/plant-type-enum';
import { PlantEditDto } from '@/data/interfaces/plant-edit-dto';
import {
  Button,
  Input,
  Textarea,
  VStack,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom';

type DeferData = {
  plant: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader(plantId: string | undefined) {
  return defer({
    plant: DashboardApi.getPlantById(plantId),
  });
}

const PlantEditor = () => {
  const dataPromise = useLoaderData() as DeferData;
  const navigate = useNavigate();
  const toast = useToast();

  const [currType, setCurrType] = useState(PlantTypeEnum.Unknown);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [predispositions, setPredispositions] = useState('');
  const [planting, setPlanting] = useState('');
  const [maintenance, setMaintenance] = useState('');

  const handleSelectOnChange = (value: string) => {
    setCurrType(+value);
  };

  function renderPlant(axiosResponse: AxiosResponse) {
    const plant: PlantEditDto = axiosResponse.data;

    const handleSubmit = async () => {
      const plantToEdit: PlantEditDto = {
        id: plant.id,
        name: name === '' ? plant.name : name,
        description: description === '' ? plant.description : description,
        type:
          currType === PlantTypeEnum.Unknown
            ? plant.type.toString()
            : currType.toString(),
        predispositions:
          predispositions === '' ? plant.predispositions : predispositions,
        planting: planting === '' ? plant.planting : planting,
        maintenance: maintenance === '' ? plant.maintenance : maintenance,
        createdAt: plant.createdAt,
      };

      DashboardApi.updatePlant(plantToEdit)
        .then(() => {
          toast({
            colorScheme: 'primary',
            title: 'Успех',
            description: 'Вашите промени се успешно зачувани!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: 'Неуспех',
            description: 'Неуспешна операција за промена на растение!',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    };

    return (
      <VStack align={'start'} w={'full'} spacing={8}>
        <VStack align={'Start'}>
          <Text fontWeight={'bold'}>Име:</Text>
          <Input
            placeholder={plant.name}
            focusBorderColor={'primary.300'}
            onChange={(event) => setName(event.target.value)}
          />
        </VStack>
        <VStack align={'Start'} w={'16em'}>
          <Text fontWeight={'bold'}>Вид:</Text>
          <Select
            value={currType}
            onChange={(event) => handleSelectOnChange(event.target.value)}
            cursor={'pointer'}
            focusBorderColor={'primary.300'}
          >
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
          <Text fontWeight={'bold'}>Опис:</Text>
          <Textarea
            h={'20em'}
            resize={'none'}
            focusBorderColor="primary.300"
            placeholder={plant.description}
            onChange={(event) => setDescription(event.target.value)}
          ></Textarea>
        </VStack>
        <VStack align={'Start'} w={'full'}>
          <Text fontWeight={'bold'}>Предуслови:</Text>
          <Textarea
            h={'20em'}
            resize={'none'}
            focusBorderColor="primary.300"
            placeholder={plant.predispositions}
            onChange={(event) => setPredispositions(event.target.value)}
          ></Textarea>
        </VStack>
        <VStack align={'Start'} w={'full'}>
          <Text fontWeight={'bold'}>Садење:</Text>
          <Textarea
            h={'20em'}
            resize={'none'}
            focusBorderColor="primary.300"
            placeholder={plant.planting}
            onChange={(event) => setPlanting(event.target.value)}
          ></Textarea>
        </VStack>
        <VStack align={'Start'} w={'full'}>
          <Text fontWeight={'bold'}>Одржување:</Text>
          <Textarea
            h={'20em'}
            resize={'none'}
            focusBorderColor="primary.300"
            placeholder={plant.maintenance}
            onChange={(event) => setMaintenance(event.target.value)}
          ></Textarea>
        </VStack>
        <Button onClick={handleSubmit}>Зачувај</Button>
      </VStack>
    );
  }

  return (
    <>
      <VStack align={'start'} spacing={8} p={5}>
        <Button leftIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Await
            resolve={dataPromise.plant}
            errorElement={<p>Error loading plant data!</p>}
          >
            {renderPlant}
          </Await>
        </React.Suspense>
      </VStack>
    </>
  );
};

export default PlantEditor;
