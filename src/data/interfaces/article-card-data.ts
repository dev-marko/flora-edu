import { AuthorDto } from './author-dto';

export interface ArticleCardData {
  id: string;
  title: string;
  shortDescription: string;
  headerImageUrl: string;
  createdAt: string;
  author: AuthorDto;
  isLiked: boolean;
  isBookmarked: boolean;
}
