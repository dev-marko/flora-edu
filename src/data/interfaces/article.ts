import { ArticleCommentDto } from './article-comment-dto';
import { AuthorDto } from './author-dto';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  headerImageUrl: string;
  content: string;
  author: AuthorDto;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  comments: ArticleCommentDto[];
  createdAt: Date;
  lastModified: Date;
}
