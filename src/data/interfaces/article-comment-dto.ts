import { CommentUserInfo } from './comment-user-info';

export interface ArticleCommentDto {
  id: string;
  articleId: string;
  user: CommentUserInfo;
  content: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: Date;
  lastModified: Date;
}
