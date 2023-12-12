import axios from './custom-axios';
import { AxiosResponse } from 'axios';

import { ArticlesRequest } from '@/data/request-interfaces/articles-request';
import { Article } from '@/data/interfaces/article';
import { NewArticleComment } from '@/data/interfaces/new-article-comment';

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

  static addNewComment = async (
    newArticleComment: NewArticleComment
  ): Promise<AxiosResponse> => {
    const res = axios.post(`${baseUrl}/comment`, newArticleComment);
    return res;
  };

  static likeComment = async (
    articleCommentId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = await axios.post(`${baseUrl}/like-comment`, articleCommentId);
    return res;
  };

  static unlikeComment = async (
    articleCommentId: string | undefined
  ): Promise<AxiosResponse> => {
    const res = await axios.post(`${baseUrl}/unlike-comment`, articleCommentId);
    return res;
  };
}

export default ArticlesApi;
