import React from 'react';

import styles from './ContentSlider.module.scss';

interface IContentSlider {
  prev: string;
  value: string;
  next: string;
  onNext(): void;
  onPrev(): void;
}

const ContentSlider: React.FC<IContentSlider> = ({ ...props }: IContentSlider) => {
  return (
    <div className={styles.contentSlider}>
      <span onClick={props.onPrev} className={styles.contentSlider__btn}>
        {props.prev}
      </span>
      <span className={styles.contentSlider__value}>{props.value}</span>
      <span onClick={props.onNext} className={styles.contentSlider__btn}>
        {props.next}
      </span>
    </div>
  );
};

export default ContentSlider;
