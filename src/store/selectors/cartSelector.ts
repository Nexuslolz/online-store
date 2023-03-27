import { IProductData } from '../../components/Content/Cart/components/CartProduct/CartProduct';
import { RootState } from '../store';

export const getCartList = (state: RootState) => {
  return state.cart.cartList;
};

export const getIsCartList = (state: RootState, product: IProductData) => {
  const isProductAdded = state.cart.cartList.find((item) => item.id === product.id);
  if (isProductAdded) {
    return true;
  } else {
    return false;
  }
};
