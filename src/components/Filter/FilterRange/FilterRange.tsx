import React from 'react';

import InputNumber from './components/InputNumber/InputNumber';
import InputRange from './components/InputRange/InputRange';

import styles from './FilterRange.module.scss';

interface IFilterRange {
  title: string;
  name: string;
}

const FilterRange: React.FC<IFilterRange> = ({ ...props }: IFilterRange) => {
  return (
    <div className={styles.filterRange}>
      <h2 className={styles.filterRange__header}>{props.title}</h2>
      <InputRange min='10' max='1500' valueMin='150' valueMax='1000' name={props.name} />
      <InputNumber min='10' max='1500' valueMin='150' valueMax='1000' />
    </div>
  );
};

export default FilterRange;
