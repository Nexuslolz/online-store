import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../models/models';

interface ISearch {
  searchValue: IProduct[] | null;
  error?: undefined;
}

const initialState: ISearch = {
  searchValue: null,
  error: undefined,
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<IProduct[]>) {
      state.searchValue = action.payload;
    },
    resetSearchValue(state) {
      state.searchValue = null;
    },
    setSearchError(state, action) {
      state.error = action.payload;
    },
  },
});
