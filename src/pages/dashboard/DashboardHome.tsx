import { UserInfo } from '@/data/interfaces/auth/user-info';
import useUserStore from '@/stores/useUserStore';
import { Divider, Flex, Text, VStack } from '@chakra-ui/react';
import PlantAnalytics from './analytics/PlantAnalytics';

const DashboardHome = () => {
  const user: UserInfo = useUserStore((state) => state.user);

  return (
    <Flex flexDir={'column'}>
      <VStack w={'full'} p={1}>
        <Text fontSize={'md'}>
          Здраво{' '}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          ! Добредојдовте на вашиот контролен панел. 📚✍
        </Text>
      </VStack>
      <Divider mb={5} />
      <PlantAnalytics />
    </Flex>
  );
};

export default DashboardHome;
