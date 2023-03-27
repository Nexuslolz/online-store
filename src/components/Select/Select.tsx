import React from 'react';

import styles from './Select.module.scss';

import { ISortingParams } from '../../utils/sorting';

interface ISelect {
  params: ISortingParams[];
  onChange(sort: string): void;
  value: string;
}

const Select: React.FC<ISelect> = ({ ...props }: ISelect) => {
  return (
    <select value={props.value} onChange={(sort) => props.onChange(sort.target.value)} className={styles.select}>
      <option value='default' disabled={true}>
        Sorting ...
      </option>
      {props.params.map((param, i) => (
        <option key={i} value={param.option}>
          {param.option}
        </option>
      ))}
    </select>
  );
};

export default Select;
