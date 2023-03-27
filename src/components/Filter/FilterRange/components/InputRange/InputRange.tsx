import Slider from 'rc-slider';
import React from 'react';

import styles from './InputRange.module.scss';
import { styled } from './InputRangeStyled';

interface IInputRange {
  min: string;
  max: string;
  valueMin: string;
  valueMax: string;
  name: string;
  onChange(): void;
}

const InputRange: React.FC<IInputRange> = ({ ...props }: IInputRange) => {
  return (
    <div className={styles.filterInputWrapper}>
      <Slider
        range
        min={Number(props.min)}
        max={Number(props.max)}
        trackStyle={{ backgroundColor: '#5ce77a' }}
        allowCross={false}
        defaultValue={[Number(props.valueMin), Number(props.valueMax)]}
        handleStyle={styled.handler}
        onChange={props.onChange}
      />
      {/* <input
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
      /> */}
    </div>
  );
};

export default InputRange;
