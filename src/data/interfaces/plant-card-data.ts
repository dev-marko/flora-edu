import { PlantTypeEnum } from '../enums/plant-type-enum';

export interface PlantCardData {
  id: string;
  name: string;
  description: string;
  type: PlantTypeEnum;
  isLiked: boolean;
  isBookmarked: boolean;
}
