export type ToDoFormProps = {
  heading: string;
  formName: string;
  formFields: FormFields;
  handleFormSubmit: (event: React.FormEvent) => Promise<void>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  updatedFiles?: FilesType[];
  min: string;
  setUpdatedFiles?: (files: FilesType[]) => void;
};

export type FormFields = {
  title: string;
  description: string;
  expiryDate: string;
};

export type FilesType = {
  id: string;
  name: string;
};
