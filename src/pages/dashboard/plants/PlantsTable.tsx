import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import {
  Await,
  defer,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom';

import DashboardApi from '@/apis/dashboard-api';
import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import React, { useState } from 'react';
import moment from 'moment';
import { PlantTableData } from '@/data/interfaces/plant-table-data';
import plantTypeTranslatorEngToMkd from '@/utils/plant-type-translator-eng-to-mkd';
import { Pencil, Trash } from 'react-bootstrap-icons';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import BigGenericErrorMessage from '@/components/shared/BigGenericErrorMessage';

type DeferData = {
  plants: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  const requestDto: PlantsRequest = {
    page: 1,
    size: 100,
  };

  return defer({
    plants: DashboardApi.getPlants(requestDto),
  });
}

const PlantsTable = () => {
  const dataPromise = useLoaderData() as DeferData;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const revalidator = useRevalidator();
  const [toDeleteId, setToDeleteId] = useState('');

  const handleEditOnClick = (plantId: string) => {
    navigate(`${plantId}`);
  };

  const handleDelete = () => {
    DashboardApi.deletePlantById(toDeleteId)
      .then(() => {
        toast({
          colorScheme: 'primary',
          title: 'Успех',
          description: 'Успешно избришано растение!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        revalidator.revalidate();
      })
      .catch(() => {
        toast({
          title: 'Неуспех',
          description: 'Неуспешна операција за бришење на растение!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        revalidator.revalidate();
      });
  };

  function renderPlants(axiosResponse: AxiosResponse) {
    const plants: PlantTableData[] = axiosResponse.data.items;

    if (plants.length === 0) {
      return (
        <Tr>
          <Td align={'center'} textAlign={'center'} colSpan={5}>
            Немате растенија 😟
          </Td>
        </Tr>
      );
    }

    const tableRows = plants.map((plant: PlantTableData) => {
      return (
        <Tr>
          <Td>{plant.name}</Td>
          <Td>{plantTypeTranslatorEngToMkd.get(plant.type.toString())}</Td>
          <Td>{moment(plant.createdAt).format('YYYY-MM-DD')}</Td>
          <Td>{moment(plant.lastModified).format('YYYY-MM-DD')}</Td>
          <Td>
            <IconButton
              aria-label={'Промени растение'}
              icon={<Pencil />}
              colorScheme={'primary'}
              onClick={() => handleEditOnClick(plant.id)}
            />
          </Td>
          <Td>
            <IconButton
              aria-label={'Избриши растение'}
              icon={<Trash />}
              colorScheme={'red'}
              onClick={() => {
                setToDeleteId(plant.id);
                onOpen();
              }}
            />
          </Td>
        </Tr>
      );
    });

    return tableRows;
  }

  return (
    <Flex w={'full'} p={5}>
      <TableContainer w={'full'} rounded={'lg'}>
        <Table colorScheme="black" rounded={'lg'}>
          <Thead bgColor={'gray.300'}>
            <Tr>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Име
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Вид
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Креирано
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Модифицирано
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Промени
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Избриши
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <React.Suspense fallback={<LoadingSpinner />}>
              <Await
                resolve={dataPromise.plants}
                errorElement={<BigGenericErrorMessage />}
              >
                {renderPlants}
              </Await>
            </React.Suspense>
          </Tbody>
          <Tfoot bgColor={'gray.300'}>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        headerText="Избриши растение"
        bodyText="Дали сте сигурни?"
        mainAction={handleDelete}
        mainActionButtonText="Избриши"
      />
    </Flex>
  );
};

export default PlantsTable;
