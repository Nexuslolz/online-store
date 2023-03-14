import React from 'react';

import styles from './Button.module.scss';

interface IButton {
  onClick(event: React.MouseEvent): void;
  isChecked?: boolean;
  text?: string;
  additionalClass?: string;
}

const Button = ({ ...props }: IButton) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.card__btn} ${props.isChecked ? styles.card__btn_add : ''} ${props.additionalClass}`}
    >
      {props.text ? props.text : props.isChecked ? 'Drop' : 'Add to cart'}
    </button>
  );
};

export default Button;
