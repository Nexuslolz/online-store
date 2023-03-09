import React, { useState } from 'react';

import styles from './SearchMain.module.scss';

import SearchInput from '../SearchInput/SearchInput';

const SearchMain = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  // const setSearchValue = () => {};

  const resetSearchValue = () => {
    setSearchValue('');
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('send search');
  };

  return (
    <div className={styles.headerSearch__wrapper}>
      <SearchInput
        value={searchValue}
        placeholder='Search ...'
        onChange={(event) => setSearchValue(event.target.value)}
        onClickReset={resetSearchValue}
        onClickHandler={(event) => submitHandler(event)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        additionalClass={active ? styles.search_active : ''}
      />
    </div>
  );
};

export default SearchMain;
