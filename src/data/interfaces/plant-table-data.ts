import { PlantTypeEnum } from '../enums/plant-type-enum';

export interface PlantTableData {
  id: string;
  name: string;
  type: PlantTypeEnum;
  createdAt: Date;
  lastModified: Date;
}
