import { PlantsRequest } from '@/data/request-interfaces/plants-request';
import axios from './custom-axios';
import { AxiosResponse } from 'axios';
import { PlantDetails } from '@/data/interfaces/plant-details';
import { PlantEditDto } from '@/data/interfaces/plant-edit-dto';
import { GeneralAnalytics } from '@/data/interfaces/general-analytics';
import { ArticlesRequest } from '@/data/request-interfaces/articles-request';
import { Article } from '@/data/interfaces/article';
import { ArticleEditDto } from '@/data/interfaces/article-edit-dto';

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

  static getArticles = async (
    requestDto: ArticlesRequest
  ): Promise<AxiosResponse> => {
    const res = axios.get(`${baseUrl}/articles`, {
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

  static getArticleById = async (
    articleId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.get<Article>(`${baseUrl}/articles/${articleId}`);
    return res;
  };

  static getPlantAnalytics = async (): Promise<AxiosResponse> => {
    const res = axios.get<GeneralAnalytics>(`${baseUrl}/plant-analytics`);
    return res;
  };

  static getArticleAnalytics = async (): Promise<AxiosResponse> => {
    const res = axios.get<GeneralAnalytics>(`${baseUrl}/article-analytics`);
    return res;
  };

  static updatePlant = async (
    plantEditDto: PlantEditDto
  ): Promise<AxiosResponse> => {
    const res = axios.put<PlantEditDto>(`${baseUrl}/plants`, plantEditDto);
    return res;
  };

  static updateArticle = async (
    articleEditDto: ArticleEditDto
  ): Promise<AxiosResponse> => {
    const res = axios.put<Article>(`${baseUrl}/articles`, articleEditDto);
    return res;
  };

  static deletePlantById = async (
    plantId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.delete<string>(`${baseUrl}/plants`, { data: plantId });
    return res;
  };

  static deleteArticleById = async (
    articleId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.delete<string>(`${baseUrl}/articles`, {
      data: articleId,
    });
    return res;
  };

  static getPlantThumbnailImagesSasToken = async (
    blobName: string
  ): Promise<AxiosResponse> => {
    const res = axios.get<string>(
      `${baseUrl}/plant-thumbnail-sas-token?blobName=${blobName}`
    );
    return res;
  };

  static getPlantHeaderImagesSasToken = async (
    blobName: string
  ): Promise<AxiosResponse> => {
    const res = axios.get<string>(
      `${baseUrl}/plant-header-sas-token?blobName=${blobName}`
    );
    return res;
  };

  static getArticleHeaderImagesSasToken = async (
    blobName: string
  ): Promise<AxiosResponse> => {
    const res = axios.get<string>(
      `${baseUrl}/article-header-sas-token?blobName=${blobName}`
    );
    return res;
  };
}

export default DashboardApi;
