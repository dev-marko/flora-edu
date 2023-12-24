import { LikesDataDto } from '@/data/interfaces/likes-data-dto';
import { Bar } from 'react-chartjs-2';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Chart as ChartJS, registerables } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(...registerables, zoomPlugin);

type LikesBarChartProps = {
  headerText: string;
  data: LikesDataDto[];
};

const LikesBarChart = ({ headerText, data }: LikesBarChartProps) => {
  const formattedData: ChartData<'bar'> = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        indexAxis: 'y',
        label: 'Број на лајкови',
        data: data.map((item) => item.likesCount),
        backgroundColor: ['#FC8181'],
      },
    ],
  };

  console.log(formattedData);

  return (
    <VStack ps={[0, 5]} align={'start'} w={'full'}>
      <Text fontSize="lg" fontFamily={'Inter'} fontWeight={'500'}>
        {headerText}
      </Text>
      <Box
        minH={'18em'}
        w={'full'}
        p={3}
        border={'1px solid'}
        borderColor={'gray.400'}
        rounded={'md'}
      >
        <Bar
          data={formattedData}
          options={
            {
              responsive: true,
              indexAxis: 'y',
              scales: {
                x: {
                  ticks: {
                    precision: 0,
                  },
                },
              },
              plugins: {
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'y',
                  },
                  zoom: {
                    pinch: {
                      enabled: true,
                    },
                    wheel: {
                      enabled: true,
                    },
                    mode: 'y',
                  },
                },
              },
            } as ChartOptions<'bar'>
          }
        />
      </Box>
    </VStack>
  );
};

export default LikesBarChart;
