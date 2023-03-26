import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FilterBox from './FilterBox/FilterBox';
import styles from './FilterPanel.module.scss';
import FilterRange from './FilterRange/FilterRange';

import { getData } from '../../store/selectors/dataSelector';
import { getIsOpen } from '../../store/selectors/menuSelector';
import { listSlice } from '../../store/slices/listSlice';
import { menuSlice } from '../../store/slices/menuSlice';
import Button from '../Button/Button';
import BtnShow from '../Content/Main/components/BtnShow/BtnShow';

const FilterPanel: React.FC = () => {
  const data = useSelector(getData);

  const waitForData = (): [string[], string[], string, string, string, string] => {
    try {
      const categories = [...new Set(data.map((product) => product.category))];
      const brands = [...new Set(data.map((product) => product.brand))];

      const priceMaxValue = String(Math.max(...data.map((product) => product.price)));
      // const stockMaxValue = String(Math.max(...data.map((product) => product.stock)));
      // const priceMinValue = String(Math.min(...data.map((product) => product.price)));
      // const stockMinValue = String(Math.min(...data.map((product) => product.stock)));

      return [categories, brands, priceMaxValue, priceMinValue, stockMaxValue, stockMinValue];
    } catch (error) {
      const categories: string[] = ['...', '...', '...', '...'];
      const brands: string[] = ['...', '...', '...', '...'];
      console.error('Data was not already loading');

      return [categories, brands, '0', '0', '0', '0'];
    }
  };
  const [categories, brands, priceMaxValue, priceMinValue, stockMaxValue, stockMinValue] = waitForData();

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

  let num = 1230;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    num += +priceMaxValue;
  }, [priceMaxValue]);

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
        <FilterBox name='Category-filter' header='Category' options={categories} />
        <FilterBox name='Brand-filter' header='Brand' options={brands} />
        <FilterRange title='Price' name='price' min={'1'} max={'123'} valueMin={'123'} valueMax={'12345'} />
        <FilterRange title='Stock' name='stock' min={'123'} max={'1234'} valueMin={String(num)} valueMax={'1234'} />
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
