export type TextFieldProps = {
  type: string;
  id: string;
  name: string;
  label: string;
  options?: { value: string; name: string }[];
  [k: string]: unknown;
};
