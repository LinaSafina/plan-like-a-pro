import { TO_DO_RELEVANCE, TO_DO_STATUS } from '../../api/api';
import { FilesType } from '../to-do-form/types';

export type ModalProps = {
  data: ToDoWithId;
  isOpen: boolean;
  onClose: () => void;
  modalType: string;
  setModalType: (value: string) => void;
  heading?: string;
};

export type ToDoType = {
  title: string;
  description: string;
  isExpired?: boolean;
  expiryDate: string;
  files: FilesType[];
  status: TO_DO_STATUS;
  projectId: string;
  priority: string;
  parentTodo: string;
  createDate: string;
  relevance: TO_DO_RELEVANCE;
};

export type ToDoWithId = ToDoType & { id: string };
