import { ToDoType, ToDoWithId } from '../modal/types';

export type ToDoItemCardType = {
  data: ToDoWithId;
  setModalType: (value: string) => void;
};
