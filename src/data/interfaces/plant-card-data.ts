import { PlantTypeEnum } from '../enums/plant-type-enum';

export interface PlantCardData {
  id: string;
  name: string;
  description: string;
  type: PlantTypeEnum;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}
