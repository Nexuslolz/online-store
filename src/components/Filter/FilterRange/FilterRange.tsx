import React from 'react';

import InputRange from './components/InputRange/InputRange';

import NumValue from './components/NumValue/NumValue';

import styles from './FilterRange.module.scss';

interface IFilterRange {
  title: string;
  name: string;
  valueMin: number;
  valueMax: number;
  min: number;
  max: number;
  onChange(event: number | number[]): void;
}

const FilterRange: React.FC<IFilterRange> = (props: IFilterRange) => {
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
      <NumValue valueMin={props.valueMin} valueMax={props.valueMax} />
    </div>
  );
};

export default FilterRange;
