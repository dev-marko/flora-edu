import { UserInfo } from '@/data/interfaces/auth/user-info';
import useUserStore from '@/stores/useUserStore';
import { Center, Text, VStack } from '@chakra-ui/react';

const DashboardHome = () => {
  const user: UserInfo = useUserStore((state) => state.user);
  return (
    <Center h={'90vh'}>
      <VStack align={'center'} justify={'center'} spacing={0}>
        <Text textAlign={'center'} fontSize={'xl'}>
          Здраво{' '}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          !
        </Text>
        <Text textAlign={'center'} fontSize={'xl'}>
          Добредојдовте на вашиот контролен панел.
        </Text>
      </VStack>
    </Center>
  );
};

export default DashboardHome;
