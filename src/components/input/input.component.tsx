import './input.styles.scss';
import { InputProps } from './types';

const Input = (props: InputProps) => {
  const { type, id, name, ...otherProps } = props;

  return (
    <input className='input' type={type} id={id} name={name} {...otherProps} />
  );
};

export default Input;
