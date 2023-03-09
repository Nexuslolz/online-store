import React from 'react';

import styles from './SearchInput.module.scss';

interface ISearchInput {
  placeholder: string;
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onClickHandler(event: React.FormEvent): void;
  onClickReset(): void;
  additionalClass?: string;
  onFocus?(): void;
  onBlur?(): void;
}

const SearchInput: React.FC<ISearchInput> = ({ ...props }: ISearchInput) => {
  return (
    <form className={`${styles.search} ${props.additionalClass}`} action='#' method='GET'>
      <input
        className={styles.search__input}
        type='text'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
      <span
        className={props.value ? styles.search__clean : `${styles.search__clean} ${styles.search__hidden}`}
        onClick={props.onClickReset}
      />
      <button
        className={props.value ? styles.search__find : `${styles.search__find} ${styles.search__hidden}`}
        type='submit'
        onClick={props.onClickHandler}
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
