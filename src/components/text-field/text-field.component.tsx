import Input from '../input/input.component';
import Select from '../select/select.component';
import TextArea from '../text-area/text-area.component';

import './text-field.styles.scss';
import { TextFieldProps } from './types';

const TextField = (props: TextFieldProps) => {
  const { type, id, name, label, ...otherProps } = props;

  let content = <Input type={type} id={id} name={name} {...otherProps} />;

  if (type === 'textarea') {
    content = <TextArea id={id} name={name} {...otherProps} />;
  }

  if (type === 'file') {
    content = <Input type={type} id={id} name={name} {...otherProps} />;
  }

  if (type === 'select') {
    content = (
      <Select
        name={name}
        id={id}
        options={props.options || []}
        {...otherProps}
      />
    );
  }

  return (
    <div className='text-field'>
      {label && (
        <label className='label' htmlFor={id}>
          {label}
        </label>
      )}
      {content}
    </div>
  );
};

export default TextField;
