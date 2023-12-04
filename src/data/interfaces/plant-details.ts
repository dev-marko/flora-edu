import { AuthorDto } from './author-dto';

export interface PlantDetails {
  id: string;
  name: string;
  type: string;
  description: string;
  predispositions: string;
  planting: string;
  maintenance: string;
  author: AuthorDto;
  // TODO: comments array
  createdAt: Date;
  lastModified: Date;
}
