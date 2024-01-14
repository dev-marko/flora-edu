import { AuthorDto } from './author-dto';

export interface ArticleCardData {
  id: string;
  title: string;
  shortDescription: string;
  headerImageUrl: string;
  createdAt: Date;
  author: AuthorDto;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
}
