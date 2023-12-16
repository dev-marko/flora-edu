import { PlantTypesSelectFilter } from '@/data/constants/plant-types-select-filter';
import { HStack, Select } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const PlantTypeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectOnChange = (value: string) => {
    if (value === '0' || value === '') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <HStack>
      <Select
        placeholder="Вид на растение"
        fontFamily={'Inter'}
        onChange={(event) => handleSelectOnChange(event.target.value)}
        cursor={'pointer'}
        focusBorderColor={'primary.300'}
      >
        {PlantTypesSelectFilter.map((type) => {
          return (
            <option key={type.value} value={type.value}>
              {type.displayName}
            </option>
          );
        })}
      </Select>
    </HStack>
  );
};

export default PlantTypeFilter;
