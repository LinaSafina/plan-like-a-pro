import { OptionalEventProperties } from 'react-dom/test-utils';

export type TextFieldProps = {
  type: string;
  id: string;
  name: string;
  label: string;
  options?: { value: string; name: string }[];
  [k: string]: unknown;
};
