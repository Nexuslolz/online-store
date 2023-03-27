import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSort } from '../../../../../store/selectors/sortSelector';

import { getTotalFound } from '../../../../../store/selectors/totalSelector';

import { listSlice } from '../../../../../store/slices/listSlice';
import { sortSlice } from '../../../../../store/slices/sortSlice';
import { sortingParams } from '../../../../../utils/sorting';

import Basket from '../../../../Basket/Basket';

import SearchMain from '../../../../Search/SearchMain';

import Select from '../../../../Select/Select';
import styles from '../../MainContent.module.scss';
import BtnShow from '../BtnShow/BtnShow';

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();

  const setCardGrid = useCallback(() => {
    dispatch(listSlice.actions.setList(false));
  }, [dispatch]);

  const setCardList = useCallback(() => {
    dispatch(listSlice.actions.setList(true));
  }, [dispatch]);

  const totalFound: string = useSelector(getTotalFound);
  const [selectedSort, setSelectedSort] = useState<string>('default');
  const sortValue = useSelector(getSort);

  useEffect(() => {
    setSelectedSort(sortValue);
  }, [sortValue]);

  const sortProducts = (sort: string) => {
    setSelectedSort(sort);
    dispatch(sortSlice.actions.setSort(sort));
  };

  return (
    <div className={styles.mainContainer__panel}>
      <Select value={selectedSort} onChange={sortProducts} params={sortingParams} />
      <p className={styles.mainContainer__text}>
        Total found: <span>{totalFound}</span>
      </p>
      <SearchMain />
      <div className={styles.showBtn__panel}>
        <BtnShow additionalClass={styles.btn__bigger} onClick={setCardGrid} />
        <BtnShow additionalClass={styles.btn__smaller} onClick={setCardList} />
      </div>
      <Basket />
    </div>
  );
};

export default ControlPanel;
