import { TO_DO_RELEVANCE, TO_DO_STATUS } from '../../api/api';

export type ToDoItemProps = {
  text: string;
  id: string;
  status: TO_DO_STATUS;
  relevance: TO_DO_RELEVANCE;
  handleModalOpen: () => void;
  setModalType: (value: string) => void;
  parentTodo: string;
  index: number;
};
