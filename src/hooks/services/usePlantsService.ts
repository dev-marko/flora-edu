import useCustomAxios from '../useCustomAxios';

const basePath = 'plants';

interface IPlantService {
  getAllPlants: (name: string) => void;
}

const usePlantsService = (): IPlantService => {
  const axios = useCustomAxios();

  const getAllPlants = async (alo: string) => {
    console.log(alo);
    const res = await axios.get(basePath);
    console.log(res);
    return res;
  };

  return {
    getAllPlants,
  };
};

export default usePlantsService;
