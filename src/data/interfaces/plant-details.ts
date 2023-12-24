import { AuthorDto } from './author-dto';
import { PlantCommentDto } from './plant-comment-dto';

export interface PlantDetails {
  id: string;
  name: string;
  type: string;
  thumbnailImageUrl: string;
  headerImageUrls: string[];
  description: string;
  predispositions: string;
  planting: string;
  maintenance: string;
  author: AuthorDto;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: PlantCommentDto[];
  createdAt: Date;
  lastModified: Date;
}
