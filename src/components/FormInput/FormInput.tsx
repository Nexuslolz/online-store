import React from 'react';

import styles from './FormInput.module.scss';

export interface IFormInput {
  type: string;
  placeholder: string;
  value: string | number | undefined;
  onClickReset(): void;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  required: boolean;
  children?: React.ReactNode;
  additionalClass?: string;
}

const FormInput: React.FC<IFormInput> = ({ ...props }: IFormInput) => {
  return (
    <li className={`${styles.formInputWrapper} ${props.additionalClass}`}>
      <input
        required={props.required}
        className={styles.formInput}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.children}
      <span
        className={props.value ? styles.formInput__clean : `${styles.formInput__clean} ${styles.formInput__hidden}`}
        onClick={props.onClickReset}
      />
    </li>
  );
};

export default FormInput;
