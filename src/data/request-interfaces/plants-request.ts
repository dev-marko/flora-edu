import { PlantTypeEnum } from '../enums/plant-type-enum';

export interface PlantsRequest {
  searchTerm?: string;
  type?: string;
  page?: number;
  size?: number;
}
