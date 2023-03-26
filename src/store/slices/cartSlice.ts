import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductData } from '../../components/Content/Cart/components/CartProduct/CartProduct';

const object = require('lodash');

interface ICart {
  cartList: IProductData[];
}

const FAV_LIST_KEY = 'Cart';
const initialState = (): ICart => {
  const serializedList = localStorage.getItem(FAV_LIST_KEY) ?? '[]';
  const cartList: IProductData[] = JSON.parse(serializedList);

  return { cartList };
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    toggleCart(state, action: PayloadAction<IProductData>) {
      const list = state.cartList;
      const product = action.payload;

      const commonProduct = list.filter((item) => item.id === product.id && item);

      if (commonProduct.length > 0 && commonProduct[0].value === product.value) {
        const foundIndex = list.findIndex((item) => {
          return object.isEqual(item, commonProduct[0]);
        });

        list.splice(foundIndex, 1);
      } else if (commonProduct.length > 0 && commonProduct[0].value < product.value) {
        const foundIndex = list.findIndex((item) => {
          return object.isEqual(item, commonProduct[0]);
        });

        list.splice(foundIndex, 1, product);
      } else if (commonProduct.length > 0 && commonProduct[0].value > product.value) {
        const foundIndex = list.findIndex((item) => {
          return object.isEqual(item, commonProduct[0]);
        });

        if (product.value >= 1 && commonProduct[0].value >= 1) {
          list.splice(foundIndex, 1, product);
        } else if (product.value <= 1) {
          list.splice(foundIndex, 1);
        }
      } else if (commonProduct.length === 0) {
        list.push(product);
      }

      const serializedList = JSON.stringify(list);
      localStorage.setItem(FAV_LIST_KEY, serializedList);
    },
  },
});
