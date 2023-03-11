import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  cartList: string[];
}

const FAV_LIST_KEY = 'Cart';
const initialState = (): ICart => {
  const serializedList = localStorage.getItem(FAV_LIST_KEY) ?? '[]';
  const cartList: string[] = JSON.parse(serializedList);

  return { cartList };
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    toggleCart(state, action: PayloadAction<string>) {
      const list = state.cartList;
      const id = action.payload;
      const foundIndex = list.indexOf(id);

      if (foundIndex !== -1) {
        list.splice(foundIndex, 1);
      } else {
        list.push(id);
      }
      const serializedList = JSON.stringify(list);
      localStorage.setItem(FAV_LIST_KEY, serializedList);
    },
  },
});
