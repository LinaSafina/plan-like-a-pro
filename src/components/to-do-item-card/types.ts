import { ToDoType } from '../modal/types';

export type ToDoItemCardType = {
  data: ToDoType;
  setIsEdited: (value: boolean) => void;
};
