import './text-area.styles.scss';
import { TextAreaProps } from './types';

const TextArea = (props: TextAreaProps) => {
  const { id, name, ...otherProps } = props;

  return (
    <textarea className='input textarea' id={id} name={name} {...otherProps} />
  );
};

export default TextArea;
