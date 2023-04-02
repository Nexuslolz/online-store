import 'rc-slider/assets/index.css';
import React, { ComponentProps, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FilterBox from './FilterBox/FilterBox';
import styles from './FilterPanel.module.scss';
import FilterRange from './FilterRange/FilterRange';

import { getIsOpen } from '../../store/selectors/menuSelector';
import { listSlice } from '../../store/slices/listSlice';
import { menuSlice } from '../../store/slices/menuSlice';
import { RootState } from '../../store/store';
import { onChangeBrand, onChangeCategory, onChangePrice, onChangeStock, resetFitlers } from '../../utils/setFilter';
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

  const allCategories = useSelector((state: RootState) => state.menu.available.categories);
  const currentCategories = useSelector((state: RootState) => state.menu.current.categories);
  const optionsCategories: ComponentProps<typeof FilterBox>['options'] = allCategories.map((name) => ({
    name,
    checked: currentCategories.includes(name),
  }));

  const allBrands = useSelector((state: RootState) => state.menu.available.brands);
  const currentBrands = useSelector((state: RootState) => state.menu.current.brands);
  const optionsBrands: ComponentProps<typeof FilterBox>['options'] = allBrands.map((name) => ({
    name,
    checked: currentBrands.includes(name),
  }));

  const allPriceMin = useSelector((state: RootState) => state.menu.available.prices.min);
  const currentPriceMin = useSelector((state: RootState) => state.menu.current.prices.min);

  const allPriceMax = useSelector((state: RootState) => state.menu.available.prices.max);
  const currentPriceMax = useSelector((state: RootState) => state.menu.current.prices.max);

  const allStockMin = useSelector((state: RootState) => state.menu.available.stock.min);
  const currentStockMin = useSelector((state: RootState) => state.menu.current.stock.min);

  const allStockMax = useSelector((state: RootState) => state.menu.available.stock.max);
  const currentStockMax = useSelector((state: RootState) => state.menu.current.stock.max);

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
        <Button
          text='reset'
          onClick={() =>
            resetFitlers(
              dispatch,
              currentCategories,
              currentBrands,
              [allPriceMin, allPriceMax],
              [allStockMin, allStockMax],
            )
          }
          additionalClass={styles.filter__btn}
        />
        <FilterBox
          onChange={(category) => onChangeCategory(category, dispatch)}
          name='Category-filter'
          header='Category'
          options={optionsCategories}
        />
        <FilterBox
          onChange={(brand) => onChangeBrand(brand, dispatch)}
          name='Brand-filter'
          header='Brand'
          options={optionsBrands}
        />
        <FilterRange
          title='Price'
          name='price'
          min={allPriceMin}
          max={allPriceMax}
          valueMin={currentPriceMin}
          valueMax={currentPriceMax}
          onChange={(event) => onChangePrice(event, dispatch)}
        />
        <FilterRange
          title='Stock'
          name='stock'
          min={allStockMin}
          max={allStockMax}
          valueMin={currentStockMin}
          valueMax={currentStockMax}
          onChange={(event) => onChangeStock(event, dispatch)}
        />
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
