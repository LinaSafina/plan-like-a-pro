import { ToDoType, ToDoWithId } from '../modal/types';

export type ToDoListProps = {
  handleModalOpen: (value: ToDoWithId) => void;
  setModalType: (value: string) => void;
  heading: string;
  todos?: ToDoWithId[];
  id: string;
};
