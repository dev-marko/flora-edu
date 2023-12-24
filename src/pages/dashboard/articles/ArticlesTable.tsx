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
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import React, { useState } from 'react';
import moment from 'moment';
import { Pencil, Trash } from 'react-bootstrap-icons';
import ConfirmationDialog from '@/components/shared/ConfirmationDialog';
import { ArticlesRequest } from '@/data/request-interfaces/articles-request';
import { ArticleTableData } from '@/data/interfaces/article-table-data';
import BigGenericErrorMessage from '@/components/shared/BigGenericErrorMessage';

type DeferData = {
  articles: Promise<AxiosResponse>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  const requestDto: ArticlesRequest = {
    page: 1,
    size: 100,
  };

  return defer({
    articles: DashboardApi.getArticles(requestDto),
  });
}

const ArticlesTable = () => {
  const dataPromise = useLoaderData() as DeferData;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const revalidator = useRevalidator();
  const [toDeleteId, setToDeleteId] = useState('');

  const handleEditOnClick = (articleId: string) => {
    navigate(`${articleId}`);
  };

  const handleDelete = () => {
    DashboardApi.deleteArticleById(toDeleteId)
      .then(() => {
        toast({
          colorScheme: 'primary',
          title: 'Успех',
          description: 'Успешно избришана статија!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        revalidator.revalidate();
      })
      .catch(() => {
        toast({
          title: 'Неуспех',
          description: 'Неуспешна операција за бришење на статија!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        revalidator.revalidate();
      });
  };

  function renderArticles(axiosResponse: AxiosResponse) {
    const articles: ArticleTableData[] = axiosResponse.data.items;

    if (articles.length === 0) {
      return (
        <Tr>
          <Td align={'center'} textAlign={'center'} colSpan={5}>
            Немате статии 😟
          </Td>
        </Tr>
      );
    }

    const tableRows = articles.map((article: ArticleTableData) => {
      return (
        <Tr>
          <Td>{article.title}</Td>
          <Td>{moment(article.createdAt).format('YYYY-MM-DD')}</Td>
          <Td>{moment(article.lastModified).format('YYYY-MM-DD')}</Td>
          <Td>
            <IconButton
              aria-label={'Промени статија'}
              icon={<Pencil />}
              colorScheme={'primary'}
              onClick={() => handleEditOnClick(article.id)}
            />
          </Td>
          <Td>
            <IconButton
              aria-label={'Избриши статија'}
              icon={<Trash />}
              colorScheme={'red'}
              onClick={() => {
                setToDeleteId(article.id);
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
                Наслов
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Креирана
              </Th>
              <Th fontFamily={'Inter'} fontSize={'1rem'}>
                Модифицирана
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
                resolve={dataPromise.articles}
                errorElement={<BigGenericErrorMessage />}
              >
                {renderArticles}
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
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        headerText="Избриши статија"
        bodyText="Дали сте сигурни?"
        mainAction={handleDelete}
        mainActionButtonText="Избриши"
      />
    </Flex>
  );
};

export default ArticlesTable;
