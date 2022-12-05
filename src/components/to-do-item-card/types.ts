import { ToDoType } from '../modal/types';

export type ToDoItemCardType = {
  data: ToDoType;
  setModalType: (value: string) => void;
};
