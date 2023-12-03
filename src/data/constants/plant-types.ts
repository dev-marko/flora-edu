import { PlantTypeEnum } from '../enums/plant-type-enum';
import { PlantType } from '../interfaces/plant-type';

export const PlantTypesSelect: Array<PlantType> = [
  {
    value: PlantTypeEnum.Unknown,
    displayName: 'Сите',
  },
  {
    value: PlantTypeEnum.Fruit,
    displayName: 'Овошје',
  },
  {
    value: PlantTypeEnum.Vegetable,
    displayName: 'Зеленчук',
  },
  {
    value: PlantTypeEnum.Nuts,
    displayName: 'Јаткасти плодови',
  },
  {
    value: PlantTypeEnum.Shrubs,
    displayName: 'Грмушки',
  },
  {
    value: PlantTypeEnum.Tree,
    displayName: 'Дрвја',
  },
  {
    value: PlantTypeEnum.Flower,
    displayName: 'Цвеќиња',
  },
  {
    value: PlantTypeEnum.Herbs,
    displayName: 'Билки',
  },
  {
    value: PlantTypeEnum.Other,
    displayName: 'Останати растенија',
  },
];
