import useCustomAxios from '../useCustomAxios';

const basePath = 'plants';

interface IPlantService {
  getAllPlants: (name: string) => void;
}

const usePlantsService = (): IPlantService => {
  const axios = useCustomAxios();

  const getAllPlants = async () => {
    const res = await axios.get(basePath);
    return res;
  };

  return {
    getAllPlants,
  };
};

export default usePlantsService;
