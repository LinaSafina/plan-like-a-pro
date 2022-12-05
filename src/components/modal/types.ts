import { FilesType } from '../to-do-form/types';

export type ModalProps = {
  data: ToDoType;
  isOpen: boolean;
  onClose: () => void;
  isEdited: boolean;
  setIsEdited: (value: boolean) => void;
};

export type ToDoType = {
  title: string;
  description: string;
  expiryDate: string;
  files: FilesType[];
  id: string;
  status: string;
  projectId: string;
};
