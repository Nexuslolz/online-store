import 'rc-slider/assets/index.css';
import React, { ComponentProps, useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FilterBox from './FilterBox/FilterBox';
import styles from './FilterPanel.module.scss';
import FilterRange from './FilterRange/FilterRange';

import { getIsOpen } from '../../store/selectors/menuSelector';
import { listSlice } from '../../store/slices/listSlice';
import { menuSlice } from '../../store/slices/menuSlice';
import { searchSlice } from '../../store/slices/searchSlice';
import { sortSlice } from '../../store/slices/sortSlice';
import { RootState } from '../../store/store';
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

  const onChangeCategory = (category: string) => {
    dispatch(menuSlice.actions.toggleCategory(category));
  };

  const onChangeBrand = (brand: string) => {
    dispatch(menuSlice.actions.toggleBrand(brand));
  };

  const resetFitlers = () => {
    dispatch(searchSlice.actions.resetSearchValue());
    dispatch(searchSlice.actions.setSearchParam(''));

    dispatch(sortSlice.actions.setSort('default'));

    currentCategories.map((category) => {
      return dispatch(menuSlice.actions.toggleCategory(category));
    });

    currentBrands.map((brand) => {
      return dispatch(menuSlice.actions.toggleBrand(brand));
    });
  };

  const setCardGrid = useCallback(() => {
    dispatch(listSlice.actions.setList(false));
  }, [dispatch]);

  const setCardList = useCallback(() => {
    dispatch(listSlice.actions.setList(true));
  }, [dispatch]);

  const price = useCallback(
    (event: number | number[]) => {
      if (typeof event === 'number') return;
      dispatch(menuSlice.actions.changePrice(event));
    },
    [dispatch],
  );

  const stock = useCallback(
    (event: number | number[]) => {
      if (typeof event === 'number') return;
      dispatch(menuSlice.actions.changeStock(event));
    },
    [dispatch],
  );

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
        <Button text='reset' onClick={resetFitlers} additionalClass={styles.filter__btn} />
        <FilterBox onChange={onChangeCategory} name='Category-filter' header='Category' options={optionsCategories} />
        <FilterBox onChange={onChangeBrand} name='Brand-filter' header='Brand' options={optionsBrands} />
        <FilterRange
          title='Price'
          name='price'
          min={String(allPriceMin)}
          max={String(allPriceMax)}
          valueMin={String(currentPriceMin)}
          valueMax={String(currentPriceMax)}
          onChange={price}
        />
        <FilterRange
          title='Stock'
          name='stock'
          min={String(allStockMin)}
          max={String(allStockMax)}
          valueMin={String(currentStockMin)}
          valueMax={String(currentStockMax)}
          onChange={stock}
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
