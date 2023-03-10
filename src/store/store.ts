import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productAPI } from './services/productService.api';
import { listSlice } from './slices/listSlice';
import { totalSlice } from './slices/totalSlice';

const rootReducer = combineReducers({
  [productAPI.reducerPath]: productAPI.reducer,
  list: listSlice.reducer,
  totalFound: totalSlice.reducer,
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
