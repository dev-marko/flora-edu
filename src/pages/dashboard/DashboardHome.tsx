import { UserInfo } from '@/data/interfaces/auth/user-info';
import useUserStore from '@/stores/useUserStore';
import { Divider, Flex, Stack, Text, VStack } from '@chakra-ui/react';
import PlantAnalytics from './analytics/PlantAnalytics';
import { defer } from 'react-router-dom';
import DashboardApi from '@/apis/dashboard-api';
import ArticleAnalytics from './analytics/ArticleAnalytics';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  return defer({
    plantAnalytics: DashboardApi.getPlantAnalytics(),
    articleAnalytics: DashboardApi.getArticleAnalytics(),
  });
};

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
      <Stack
        mt={2}
        direction={['column', 'row']}
        w={'full'}
        justify={'start'}
        spacing={12}
      >
        <PlantAnalytics />
        <ArticleAnalytics />
      </Stack>
    </Flex>
  );
};

export default DashboardHome;
