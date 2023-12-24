import { PlantTypeEnum } from '../enums/plant-type-enum';

export interface PlantEditDto {
  id?: string;
  name: string;
  type: PlantTypeEnum | string;
  thumbnailImageUrl: string;
  headerImageUrl: string;
  description: string;
  predispositions: string;
  planting: string;
  maintenance: string;
  isNew: boolean;
}
