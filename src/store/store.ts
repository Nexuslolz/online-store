import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productAPI } from './services/productService.api';
import { cartSlice } from './slices/cartSlice';
import { dataSlice } from './slices/dataSlice';
import { listSlice } from './slices/listSlice';
import { searchSlice } from './slices/searchSlice';
import { totalSlice } from './slices/totalSlice';

const rootReducer = combineReducers({
  [productAPI.reducerPath]: productAPI.reducer,
  list: listSlice.reducer,
  totalFound: totalSlice.reducer,
  cart: cartSlice.reducer,
  search: searchSlice.reducer,
  data: dataSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(productAPI.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
