import { RootState } from '../store';

export const getCartList = (state: RootState) => {
  return state.cart.cartList;
};

export const getIsCartList = (state: RootState, id: string) => {
  return state.cart.cartList.includes(id);
};
