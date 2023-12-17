import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import axios from './custom-axios';
import { AxiosResponse } from 'axios';
import { PlantDetails } from '@/data/interfaces/plant-details';
import { NewPlantComment } from '@/data/interfaces/new-plant-comment';
import { PlantCommentDto } from '@/data/interfaces/plant-comment-dto';
import { PagedList } from '@/data/interfaces/paged-list';
import { PlantCardData } from '@/data/interfaces/plant-card-data';
import { UniqueVisitorDto } from '@/data/interfaces/unique-visitor-dto';

const baseUrl = 'plants';

class PlantsApi {
  static getPlants = async (
    requestDto: PlantsRequest
  ): Promise<AxiosResponse<PagedList<PlantCardData>>> => {
    const res = axios.get<PagedList<PlantCardData>>(baseUrl, {
      params: {
        searchTerm: requestDto.searchTerm,
        type: requestDto.type,
        page: requestDto.page,
        size: requestDto.size,
      },
    });
    return res;
  };

  static getBookmarkedPlants = async (
    requestDto: PlantsRequest
  ): Promise<AxiosResponse> => {
    const res = axios.get(`${baseUrl}/bookmarks`, {
      params: {
        searchTerm: requestDto.searchTerm,
        type: requestDto.type,
        page: requestDto.page,
        size: requestDto.size,
      },
    });
    return res;
  };

  static getMostPopularPlants = async (): Promise<
    AxiosResponse<PlantCardData[]>
  > => {
    const res = axios.get(`${baseUrl}/most-popular`);
    return res;
  };

  static getPlantById = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.get<PlantDetails>(`${baseUrl}/${plantId}`);
    return res;
  };

  static bookmarkPlant = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = await axios.post(`${baseUrl}/bookmark`, plantId);
    return res;
  };

  static likePlant = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = await axios.post(`${baseUrl}/like-plant`, plantId);
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
    const res = await axios.post(`${baseUrl}/like-comment`, plantCommentId);
    return res;
  };

  static registerUniqueVisitor = async (uniqueVisitor: UniqueVisitorDto) => {
    await axios.post(`${baseUrl}/register-unique-visitor`, uniqueVisitor);
  };
}

export default PlantsApi;
