import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FilterBox from './FilterBox/FilterBox';
import styles from './FilterPanel.module.scss';
import FilterRange from './FilterRange/FilterRange';

import { getIsOpen } from '../../store/selectors/menuSelector';
import { listSlice } from '../../store/slices/listSlice';
import { menuSlice } from '../../store/slices/menuSlice';
import Button from '../Button/Button';
import BtnShow from '../Content/Main/components/BtnShow/BtnShow';

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);

  const closeMenu = () => {
    if (isOpen) {
      dispatch(menuSlice.actions.setMenu(false));
    }
  };

  const setCardGrid = useCallback(() => {
    dispatch(listSlice.actions.setList(false));
  }, [dispatch]);

  const setCardList = useCallback(() => {
    dispatch(listSlice.actions.setList(true));
  }, [dispatch]);

  return (
    <>
      <div className={`${styles.filterWrapper} ${isOpen ? styles.filterWrapper_open : ''}`}>
        <div className={styles.filterParams__wrapper}>
          <div className={styles.filterBtn__wrapper} onClick={closeMenu}>
            <button className={styles.filter__btn_close}></button>
          </div>
          <div className={styles.filterShowBtn__panel}>
            <BtnShow additionalClass={styles.btn__bigger} onClick={setCardGrid} />
            <BtnShow additionalClass={styles.btn__smaller} onClick={setCardList} />
          </div>
        </div>
        <Button text='reset' onClick={() => console.log('reset')} additionalClass={styles.filter__btn} />
        <FilterBox
          name='Category-filter'
          header='Category'
          options={['casssssssssssssst1', 'cat2', 'cat3', 'cat4', 'cat5']}
        />
        <FilterBox name='Brand-filter' header='Brand' options={['brand1', 'brand2', 'brand3', 'brand4']} />
        <FilterRange title='Price' name='price' />
        <FilterRange title='Stock' name='stock' />
      </div>
      <div
        className={
          isOpen
            ? `${styles.filterWrapper__overlay} ${styles.filterWrapper__overlay_open}`
            : styles.filterWrapper__overlay
        }
      ></div>
    </>
  );
};

export default FilterPanel;
