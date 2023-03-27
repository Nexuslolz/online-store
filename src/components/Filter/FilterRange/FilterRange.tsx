import React from 'react';

import InputNumber from './components/InputNumber/InputNumber';

import InputRange from './components/InputRange/InputRange';

import styles from './FilterRange.module.scss';

interface IFilterRange {
  title: string;
  name: string;
  valueMin: string;
  valueMax: string;
  min: string;
  max: string;
  onChange(event: number | number[]): void;
}

const FilterRange: React.FC<IFilterRange> = ({ ...props }: IFilterRange) => {
  return (
    <div className={styles.filterRange}>
      <h2 className={styles.filterRange__header}>{props.title}</h2>
      <InputRange
        min={props.min}
        max={props.max}
        valueMin={props.valueMin}
        valueMax={props.valueMax}
        name={props.name}
        onChange={props.onChange}
      />
      <InputNumber
        onChange={() => console.log('1')}
        min={props.min}
        max={props.max}
        valueMin={props.valueMin}
        valueMax={props.valueMax}
      />
    </div>
  );
};

export default FilterRange;
