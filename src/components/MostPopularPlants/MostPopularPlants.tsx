import {
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import PlantCard from '../PlantCard/PlantCard';

import plants from '../../assets/data/plants.json';
import { Link } from 'react-router-dom';

const MostPopularPlants = () => {
  const dividerColor = useColorModeValue('black', 'whiteAlpha.900');

  return (
    <Flex flexDir={'column'}>
      <Stack
        direction={{ base: 'column', sm: 'column', md: 'row' }}
        flexWrap={'wrap'}
        px={8}
        py={5}
        justify={'space-between'}
        spacing={{ base: 5 }}
      >
        <Heading textAlign={{ base: 'center' }}>Најпопуларни растенија</Heading>
        <Button>
          <Link to="plants">Сите растенија</Link>
        </Button>
      </Stack>
      <Divider borderColor={dividerColor} borderRadius={'lg'} />
      <Stack
        direction={['column', 'row']}
        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
        justify={'center'}
      >
        {plants.map((plant) => (
          <PlantCard {...plant}></PlantCard>
        ))}
      </Stack>
    </Flex>
  );
};

export default MostPopularPlants;
