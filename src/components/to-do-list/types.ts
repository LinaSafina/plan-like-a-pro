import { ToDoType } from '../modal/types';

export type ToDoListProps = {
  handleModalOpen: (value: ToDoType) => void;
  setModalType: (value: string) => void;
  heading: string;
  todos: ToDoType[];
  id: string;
};
