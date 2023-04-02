import Slider from 'rc-slider';
import React from 'react';

import styles from './InputRange.module.scss';
import { styled } from './InputRangeStyled';

interface IInputRange {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  name: string;
  onChange(event: number | number[]): void;
}

const InputRange: React.FC<IInputRange> = (props: IInputRange) => {
  return (
    <div className={styles.filterInputWrapper}>
      <Slider
        range
        min={props.min}
        max={props.max}
        trackStyle={{ backgroundColor: '#5ce77a' }}
        allowCross={false}
        value={[props.valueMin, props.valueMax]}
        handleStyle={styled.handler}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputRange;
