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
  // TODO: comments array
  createdAt: Date;
  lastModified: Date;
}
