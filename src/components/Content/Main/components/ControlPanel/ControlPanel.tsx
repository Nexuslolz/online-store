import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getData } from '../../../../../store/selectors/dataSelector';

import { getTotalFound } from '../../../../../store/selectors/totalSelector';
import { dataSlice } from '../../../../../store/slices/dataSlice';

import { listSlice } from '../../../../../store/slices/listSlice';
import { sortingParams } from '../../../../../utils/sorting';

import Basket from '../../../../Basket/Basket';

import SearchMain from '../../../../Search/SearchMain';

import Select from '../../../../Select/Select';
import styles from '../../MainContent.module.scss';
import BtnShow from '../BtnShow/BtnShow';

const ControlPanel = () => {
  const dispatch = useDispatch();

  const setCardGrid = useCallback(() => {
    dispatch(listSlice.actions.setList(false));
  }, [dispatch]);

  const setCardList = useCallback(() => {
    dispatch(listSlice.actions.setList(true));
  }, [dispatch]);

  const totalFound: string = useSelector(getTotalFound);

  const [selectedSort, setSelectedSort] = useState<string>('Sorting ...');
  // const data = useSelector(getData);

  const sortProducts = (sort: string) => {
    setSelectedSort(sort);
    // const result = [...data!];
    // for (let key of sortingParams) {
    //   if (key.option === sort) {
    //     key.sort(result);
    //   }
    // }
    // dispatch(dataSlice.actions.setData(result));
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
