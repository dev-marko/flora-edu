import { Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import PlantCard from '../PlantCard/PlantCard';

const MostPopularPlants = () => {
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
        <Button>Сите растенија</Button>
      </Stack>
      <Divider borderColor={'black'} />
      <Stack
        direction={['column', 'row']}
        flexWrap={{ base: 'wrap', sm: 'wrap', md: 'wrap', lg: 'nowrap' }}
        justify={'center'}
      >
        <PlantCard></PlantCard>
        <PlantCard></PlantCard>
        <PlantCard></PlantCard>
        <PlantCard></PlantCard>
      </Stack>
    </Flex>
  );
};

export default MostPopularPlants;
