import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import axios from './custom-axios';
import { AxiosResponse } from 'axios';
import { PlantDetails } from '@/data/interfaces/plant-details';

const baseUrl = 'plants';

class PlantsApi {
  static getPlants = async (
    requestDto: PlantsRequest
  ): Promise<AxiosResponse> => {
    const res = axios.get(baseUrl, {
      params: {
        type: requestDto.type,
        page: requestDto.page,
        size: requestDto.size,
      },
    });
    return res;
  };

  static getPlantById = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.get<PlantDetails>(`${baseUrl}/${plantId}`);
    return res;
  };
}

export default PlantsApi;
