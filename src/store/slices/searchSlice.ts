import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../models/models';

interface ISearch {
  searchValue: IProduct[] | null;
  loading: boolean;
  error: string;
}

const initialState: ISearch = {
  searchValue: null,
  loading: false,
  error: '',
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
    setSearchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSearchError(state, action) {
      state.error = action.payload;
    },
  },
});
