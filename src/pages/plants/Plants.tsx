import { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
  Stack,
} from '@chakra-ui/react';

import Breadcrumbs from '@/components/shared/Breadcrumbs/Breadcrumbs';
import { PlantTypesSelect } from '@/data/constants/plant-types';
import { PlantTypeEnum } from '@/data/enums/plant-type-enum';
import PlantsList from '@/components/PlantsList/PlantsList';

const Plants = () => {
  const [currType, setCurrType] = useState(PlantTypeEnum.Unknown);

  const handleSelectOnChange = (value: string) => {
    setCurrType(+value);
  };

  useEffect(() => {
    console.log('TODO: Refetch data');
  }, [currType]);

  return (
    <VStack align={'start'} mt={{ base: 0, md: 5 }}>
      <Breadcrumbs />
      <Stack direction={['column', 'row']} spacing={4} w={{ base: 'full' }}>
        <Select
          placeholder="Вид на растение"
          fontFamily={'Inter'}
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
        <InputGroup>
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
          <Input
            type="text"
            fontFamily={'Inter'}
            placeholder="Пребарај растение"
            focusBorderColor="primary.300"
          />
        </InputGroup>
      </Stack>
      <PlantsList />
    </VStack>
  );
};

export default Plants;
