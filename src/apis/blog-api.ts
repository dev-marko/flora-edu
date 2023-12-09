import axios from './custom-axios';
import { AxiosResponse } from 'axios';

import { ArticlesRequest } from '@/data/request-interfaces/articles-request';
import { Article } from '@/data/interfaces/article';

const baseUrl = 'articles';

class ArticlesApi {
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

  static getArticleById = async (
    authorId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = axios.get<Article>(`${baseUrl}/${authorId}`);
    return res;
  };
}

export default ArticlesApi;
