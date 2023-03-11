import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import styles from './SearchMain.module.scss';

import { useLazyFetchDifiniteProductQuery } from '../../store/services/productService.api';
import { searchSlice } from '../../store/slices/searchSlice';
import SearchInput from '../SearchInput/SearchInput';

const SearchMain = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  const [getProduct, { error }] = useLazyFetchDifiniteProductQuery();
  const dispatch = useDispatch();

  const resetSearchValue = useCallback(() => {
    setSearchValue('');
    dispatch(searchSlice.actions.resetSearchValue());
  }, [dispatch]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setSearchValue(searchValue);

    const data = await getProduct(searchValue);
    if (!data.data) return;
    dispatch(searchSlice.actions.setSearchValue(data.data.products));
    if (error) {
      dispatch(searchSlice.actions.setSearchError(error));
    }
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
