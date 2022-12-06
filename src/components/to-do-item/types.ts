export type ToDoItemProps = {
  text: string;
  id: string;
  status: string;
  handleModalOpen: () => void;
  setModalType: (value: string) => void;
  parentTodo: string;
  index: number;
};
