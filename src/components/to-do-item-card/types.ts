import { DataType } from '../modal/types';

export type ToDoItemCardType = {
  data: DataType;
  setIsEdited: (value: boolean) => void;
};
