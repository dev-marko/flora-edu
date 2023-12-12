import { CommentUserInfo } from './comment-user-info';

export interface PlantCommentDto {
  id: string;
  plantId: string;
  user: CommentUserInfo;
  content: string;
  isLiked: boolean;
  likeCount: number;
  createdAt: Date;
  lastModified: Date;
}
