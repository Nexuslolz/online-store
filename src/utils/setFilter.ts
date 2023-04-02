import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import { IProduct } from '../models/models';
import { menuSlice } from '../store/slices/menuSlice';
import { searchSlice } from '../store/slices/searchSlice';
import { sortSlice } from '../store/slices/sortSlice';

export const setFilters = (data: IProduct[], dispatch: Dispatch<AnyAction>) => {
  const categories = [...new Set(data.map((product) => product.category))];
  const brands = [...new Set(data.map((product) => product.brand))];
  const priceMaxValue = Math.max(...data.map((product) => product.price));
  const stockMaxValue = Math.max(...data.map((product) => product.stock));
  const priceMinValue = Math.min(...data.map((product) => product.price));
  const stockMinValue = Math.min(...data.map((product) => product.stock));

  dispatch(
    menuSlice.actions.setFilterParams({
      categories,
      brands,
      prices: { min: priceMinValue, max: priceMaxValue },
      stock: { min: stockMinValue, max: stockMaxValue },
    }),
  );
};

export const onChangeCategory = (category: string, dispatch: Dispatch<AnyAction>) => {
  dispatch(menuSlice.actions.toggleCategory(category));
};

export const onChangeBrand = (brand: string, dispatch: Dispatch<AnyAction>) => {
  dispatch(menuSlice.actions.toggleBrand(brand));
};

export const onChangePrice = (event: number | number[], dispatch: Dispatch<AnyAction>) => {
  if (typeof event === 'number') return;
  dispatch(menuSlice.actions.changePrice(event));
};
export const onChangeStock = (event: number | number[], dispatch: Dispatch<AnyAction>) => {
  if (typeof event === 'number') return;
  dispatch(menuSlice.actions.changeStock(event));
};

export const resetFitlers = (
  dispatch: Dispatch<AnyAction>,
  currentCategories: string[],
  currentBrands: string[],
  defaultPrice: number[],
  defaultStock: number[],
) => {
  dispatch(searchSlice.actions.resetSearchValue());
  dispatch(searchSlice.actions.setSearchParam(''));

  dispatch(sortSlice.actions.setSort('default'));

  currentCategories.map((category) => {
    return dispatch(menuSlice.actions.toggleCategory(category));
  });

  currentBrands.map((brand) => {
    return dispatch(menuSlice.actions.toggleBrand(brand));
  });

  dispatch(menuSlice.actions.changePrice(defaultPrice));
  dispatch(menuSlice.actions.changeStock(defaultStock));
};
