import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import axios from './custom-axios';
import { AxiosResponse } from 'axios';
import { PlantDetails } from '@/data/interfaces/plant-details';
import { NewPlantComment } from '@/data/interfaces/new-plant-comment';
import { PlantCommentDto } from '@/data/interfaces/plant-comment-dto';

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

  static addNewComment = async (
    newPlantComment: NewPlantComment
  ): Promise<AxiosResponse> => {
    const res = axios.post<PlantCommentDto>(
      `${baseUrl}/comment`,
      newPlantComment
    );
    return res;
  };

  static likeComment = async (
    plantCommentId: string | undefined
  ): Promise<AxiosResponse> => {
    console.log(plantCommentId);
    const res = await axios.post(`${baseUrl}/like-comment`, plantCommentId);
    return res;
  };

  static unlikeComment = async (
    plantCommentId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = await axios.post(`${baseUrl}/unlike-comment`, plantCommentId);
    return res;
  };
}

export default PlantsApi;
