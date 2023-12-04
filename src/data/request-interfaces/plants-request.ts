import { PlantTypeEnum } from '../enums/plant-type-enum';

export interface PlantsRequest {
  type?: PlantTypeEnum;
  page?: number;
  size?: number;
}
