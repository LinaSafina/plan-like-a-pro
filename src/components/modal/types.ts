import { FilesType } from '../to-do-form/types';

export type ModalProps = {
  data: ToDoType;
  isOpen: boolean;
  onClose: () => void;
  modalType: string;
  setModalType: (value: string) => void;
  heading?: string;
};

export type ToDoType = {
  title: string;
  description: string;
  expiryDate: string;
  files: FilesType[];
  id: string;
  status: string;
  projectId: string;
  priority: string;
  parentTodo: string;
  createDate: string;
};
