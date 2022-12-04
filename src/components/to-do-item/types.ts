export type ToDoItemProps = {
  text: string;
  id: string;
  status: string;
  handleModalOpen: () => void;
  setIsEdited: (value: boolean) => void;
};
