import { AuthorDto } from './author-dto';
import { PlantCommentDto } from './plant-comment-dto';

export interface PlantDetails {
  id: string;
  name: string;
  type: string;
  description: string;
  predispositions: string;
  planting: string;
  maintenance: string;
  author: AuthorDto;
  comments: PlantCommentDto[];
  createdAt: Date;
  lastModified: Date;
}
