import axios from './custom-axios';
import { AxiosResponse } from 'axios';

import { ArticlesRequest } from '@/data/request-interfaces/articles-request';

const baseUrl = 'articles';

class ArticleApi {
  static getArticles = async (
    requestDto: ArticlesRequest
  ): Promise<AxiosResponse> => {
    const res = axios.get(baseUrl, {
      params: {
        searchTerm: requestDto.searchTerm,
        page: requestDto.page,
        size: requestDto.size,
      },
    });
    return res;
  };

  // static getPlantById = async (
  //   plantId: string | undefined
  // ): Promise<AxiosResponse> => {
  //   const res = axios.get<PlantDetails>(`${baseUrl}/${plantId}`);
  //   return res;
  // };
}

export default ArticleApi;
