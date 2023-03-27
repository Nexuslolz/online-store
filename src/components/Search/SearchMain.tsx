import React, { useState, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import styles from './SearchMain.module.scss';

import { getSearchParams } from '../../store/selectors/searchSelector';
import { useLazyFetchDifiniteProductQuery } from '../../store/services/productService.api';
import { searchSlice } from '../../store/slices/searchSlice';
import SearchInput from '../SearchInput/SearchInput';

const SearchMain = () => {
  const [, , , searchParam] = useSelector(getSearchParams);
  const [searchValue, setSearchValue] = useState<string>(searchParam);
  const [active, setActive] = useState<boolean>(false);

  const [getProduct] = useLazyFetchDifiniteProductQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetSearchValue = useCallback(() => {
    dispatch(searchSlice.actions.setSearchParam(''));
    setSearchValue('');
    dispatch(searchSlice.actions.resetSearchValue());
  }, [dispatch]);

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  const submitHandler = async (event: React.FormEvent) => {
    navigate('/');
    event.preventDefault();
    setSearchValue(searchValue);
    dispatch(searchSlice.actions.setSearchParam(searchValue));

    dispatch(searchSlice.actions.setSearchLoading(true));

    try {
      const data = await getProduct(searchValue);

      if (!data.data) {
        dispatch(searchSlice.actions.setSearchLoading(false));
        dispatch(searchSlice.actions.setSearchError('Products was not found. Please, try later'));

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
