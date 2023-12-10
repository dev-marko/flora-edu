import { PlantTypeEnum } from '../enums/plant-type-enum';
import { PlantEditDto } from '../interfaces/plant-edit-dto';

const emptyPlantEditDto: PlantEditDto = {
  id: '',
  name: '',
  type: PlantTypeEnum.Unknown,
  description: '',
  maintenance: '',
  planting: '',
  predispositions: '',
  createdAt: new Date(),
};

export default emptyPlantEditDto;
