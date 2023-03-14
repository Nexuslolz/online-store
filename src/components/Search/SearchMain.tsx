import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';

import styles from './SearchMain.module.scss';

import { useLazyFetchDifiniteProductQuery } from '../../store/services/productService.api';
import { searchSlice } from '../../store/slices/searchSlice';
import SearchInput from '../SearchInput/SearchInput';

const SearchMain = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  const [getProduct] = useLazyFetchDifiniteProductQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetSearchValue = useCallback(() => {
    setSearchValue('');
    dispatch(searchSlice.actions.resetSearchValue());
  }, [dispatch]);

  const submitHandler = async (event: React.FormEvent) => {
    navigate('/');
    event.preventDefault();
    setSearchValue(searchValue);

    dispatch(searchSlice.actions.setSearchLoading(true));

    try {
      const data = await getProduct(searchValue);

      if (!data.data) {
        dispatch(searchSlice.actions.setSearchLoading(false));
        dispatch(searchSlice.actions.setSearchError('products was not found. Please, try later'));

        return;
      }

      dispatch(searchSlice.actions.setSearchValue(data.data.products));
      dispatch(searchSlice.actions.setSearchLoading(false));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(searchSlice.actions.setSearchError(`Searching error ${error.message}`));
      } else {
        dispatch(searchSlice.actions.setSearchError(`Searching error ...`));
      }
      dispatch(searchSlice.actions.setSearchLoading(false));
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
