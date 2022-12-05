import { SelectProps } from './types';

import './select.styles.scss';

const Select = (props: SelectProps) => {
  const { name, options, ...otherProps } = props;

  const listOfOptions = options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.name}
    </option>
  ));

  return (
    <select className='select' name={name} {...otherProps}>
      {listOfOptions}
    </select>
  );
};

export default Select;
