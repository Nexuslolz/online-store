import React from 'react';

import styles from './Select.module.scss';

interface ISelect {
  defaultValue: string;
  options: string[];
}

const Select: React.FC<ISelect> = ({ ...props }: ISelect) => {
  return (
    <select defaultValue={props.defaultValue} className={styles.select}>
      <option disabled={true}>{props.defaultValue}</option>
      {props.options.map((option, i) => (
        <option key={i}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
