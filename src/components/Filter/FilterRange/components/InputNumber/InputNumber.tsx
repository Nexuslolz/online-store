import React from 'react';

import styles from './InputNumber.module.scss';

interface IInputNumber {
  min: string;
  max: string;
  valueMin: string;
  valueMax: string;
  onChange(): void;
}

const InputNumber: React.FC<IInputNumber> = ({ ...props }: IInputNumber) => {
  return (
    <div className={styles.filterValueWrapper}>
      <div className={`${styles.filter__value} ${styles.valueMin}`}>
        <h4 className={`${styles.filter__subheader} ${styles.valueMin__header}`}>MIN</h4>
        <input
          onChange={() => console.log('2')}
          className={styles.valueMin__input}
          type='number'
          min={props.min}
          max={props.max}
          id='from-input'
          defaultValue={props.valueMin}
        />
      </div>
      <div className={`${styles.filter__value} ${styles.valueMax}`}>
        <h4 className={`${styles.filter__subheader} ${styles.valueMax__header}`}>MAX</h4>
        <input
          onChange={() => console.log('3')}
          className={styles.valueMin__input}
          type='number'
          min={props.min}
          max={props.max}
          id='to-input'
          defaultValue={props.valueMax}
        />
      </div>
    </div>
  );
};

export default InputNumber;
