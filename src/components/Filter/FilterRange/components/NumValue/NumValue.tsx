import React from 'react';

import styles from './NumValue.module.scss';

interface IInputNumber {
  valueMin: number;
  valueMax: number;
}

const InputNumber: React.FC<IInputNumber> = (props: IInputNumber) => {
  return (
    <div className={styles.filterValueWrapper}>
      <div className={`${styles.filter__value} ${styles.valueMin}`}>
        <h4 className={`${styles.filter__subheader} ${styles.valueMin__header}`}>MIN</h4>
        <div className={styles.filter__numValue}>{props.valueMin}</div>
      </div>
      <div className={`${styles.filter__value} ${styles.valueMax}`}>
        <h4 className={`${styles.filter__subheader} ${styles.valueMax__header}`}>MAX</h4>
        <div className={styles.filter__numValue}>{props.valueMax}</div>
      </div>
    </div>
  );
};

export default InputNumber;
