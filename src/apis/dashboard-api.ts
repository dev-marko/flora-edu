import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import axios from './custom-axios';
import { AxiosResponse } from 'axios';
import { PlantDetails } from '@/data/interfaces/plant-details';
import { PlantEditDto } from '@/data/interfaces/plant-edit-dto';
import { PlantAnalytics } from '@/data/interfaces/plant-analytics';

const baseUrl = 'dashboard';

class DashboardApi {
  static getPlants = async (
    requestDto: PlantsRequest
  ): Promise<AxiosResponse> => {
    const res = axios.get(`${baseUrl}/plants`, {
      params: {
        page: requestDto.page,
        size: requestDto.size,
      },
    });
    return res;
  };

  static getPlantById = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.get<PlantDetails>(`${baseUrl}/plants/${plantId}`);
    return res;
  };

  static getPlantAnalytics = async (): Promise<AxiosResponse> => {
    const res = axios.get<PlantAnalytics>(`${baseUrl}/plant-analytics`);
    return res;
  };

  static updatePlant = async (
    plantEditDto: PlantEditDto
  ): Promise<AxiosResponse> => {
    const res = axios.put<PlantEditDto>(`${baseUrl}/plants`, plantEditDto);
    return res;
  };

  static deletePlantById = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.delete<string>(`${baseUrl}/plants`, { data: plantId });
    return res;
  };
}

export default DashboardApi;
