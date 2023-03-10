import React from 'react';

import styles from './InputRange.module.scss';

interface IInputRange {
  min: string;
  max: string;
  valueMin: string;
  valueMax: string;
  name: string;
}

const InputRange: React.FC<IInputRange> = ({ ...props }: IInputRange) => {
  return (
    <div className={styles.filterInputWrapper}>
      <input
        className={`${styles.filter__input} ${styles.inputMin}`}
        type='range'
        name={props.name}
        id='from-slider'
        min={props.min}
        max={props.max}
        defaultValue={props.valueMin}
      />
      <input
        className={`${styles.filter__input} ${styles.inputMax}`}
        type='range'
        name={props.name}
        id='to-slider'
        min={props.min}
        max={props.max}
        defaultValue={props.valueMax}
      />
    </div>
  );
};

export default InputRange;
