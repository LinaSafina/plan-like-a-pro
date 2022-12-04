import { FilesType } from '../to-do-form/types';

export type ModalProps = {
  data: DataType;
  isOpen: boolean;
  onClose: () => void;
  isEdited: boolean;
  setIsEdited: (value: boolean) => void;
};

export type DataType = {
  title: string;
  description: string;
  expiryDate: string;
  files: FilesType[];
  id: string;
  status: string;
};
