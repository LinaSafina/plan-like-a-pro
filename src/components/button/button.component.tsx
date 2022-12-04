import './button.styles.scss';
import { ButtonProps } from './types';

const Button = (props: ButtonProps) => {
  const { text, className = '', disabled } = props;

  const btnClasses = `button ${className ? className : ''} ${
    disabled ? 'disabled' : ''
  }`;

  return <button className={btnClasses}>{text}</button>;
};

export default Button;
