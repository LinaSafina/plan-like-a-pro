export type NewCommentFormProps = {
  taskId: string;
  cancelButton?: boolean;
  onCancel?: () => void;
  parentId?: string;
};
