import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTotalFound } from '../../../../../store/selectors/totalSelector';

import { listSlice } from '../../../../../store/slices/listSlice';

import Basket from '../../../../Basket/Basket';

import SearchMain from '../../../../Search/SearchMain';

import Select from '../../../../Select/Select';
import styles from '../../MainContent.module.scss';
import BtnShow from '../BtnShow/BtnShow';

const ControlPanel = () => {
  const options = ['Price ASC', 'Price DESC', 'Rating ASC', 'Rating DESC', 'Discount ASC', 'Discount DESC'];

  const dispatch = useDispatch();

  const setCardGrid = useCallback(() => {
    dispatch(listSlice.actions.setList(false));
  }, [dispatch]);

  const setCardList = useCallback(() => {
    dispatch(listSlice.actions.setList(true));
  }, [dispatch]);

  const totalFound: string = useSelector(getTotalFound);

  return (
    <div className={styles.mainContainer__panel}>
      <Select defaultValue='Sorting' options={options} />
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
