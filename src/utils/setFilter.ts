import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import { IProduct } from '../models/models';
import { menuSlice } from '../store/slices/menuSlice';

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
