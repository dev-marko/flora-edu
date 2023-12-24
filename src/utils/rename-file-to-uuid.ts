import { v4 as uuidv4 } from 'uuid';

export const renameFileToUuid = (originalFile: any) => {
  const extension = originalFile.name.split('.').pop();
  return new File([originalFile], `${uuidv4()}.${extension}`, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
};
