import { PagedList } from '@/data/interfaces/paged-list';
import { Button, HStack, IconButton } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import { createSearchParams, useNavigate } from 'react-router-dom';

interface PaginationProps<T> {
  pagedListData: PagedList<T>;
}

const populatePageNumbers = (totalItems: number, pageSize: number) => {
  const pageNumbers: number[] = [];
  for (let index = 1; index <= Math.ceil(totalItems / pageSize); index++) {
    pageNumbers.push(index);
  }
  return pageNumbers;
};

const Pagination = <T extends object>({
  pagedListData: data,
}: PaginationProps<T>) => {
  const navigate = useNavigate();
  const pageNumbers: number[] = populatePageNumbers(
    data.totalCount,
    data.pageSize
  );

  const goPreviousPage = () => {
    const prevPageNum = --data.page;
    navigate({
      pathname: '.',
      search: createSearchParams({
        page: prevPageNum.toString(),
        size: data.pageSize.toString(),
      }).toString(),
    });
  };

  const goNextPage = () => {
    const nextPageNum = ++data.page;
    navigate({
      pathname: '.',
      search: createSearchParams({
        page: nextPageNum.toString(),
        size: data.pageSize.toString(),
      }).toString(),
    });
  };

  const onDedicatedPageClick = (pageNumber: number) => {
    navigate({
      pathname: '.',
      search: createSearchParams({
        page: pageNumber.toString(),
        size: data.pageSize.toString(),
      }).toString(),
    });
  };

  return (
    <HStack my={2}>
      <IconButton
        isDisabled={!data.hasPreviousPage}
        aria-label="Previous page"
        icon={<ArrowLeft />}
        colorScheme={'gray'}
        onClick={goPreviousPage}
      />
      {pageNumbers.map((pageNum, index) => {
        return (
          <Button
            key={index}
            onClick={() => onDedicatedPageClick(pageNum)}
            colorScheme={pageNum === data.page ? 'primary' : 'gray'}
          >
            {pageNum}
          </Button>
        );
      })}
      <IconButton
        isDisabled={!data.hasNextPage}
        aria-label="Next page"
        icon={<ArrowRight />}
        colorScheme={'gray'}
        onClick={goNextPage}
      />
    </HStack>
  );
};

export default Pagination;
