import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISorting {
  sort: string;
}

const initialState: ISorting = {
  sort: 'default',
};

export const sortSlice = createSlice({
  name: 'sortSlice',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
  },
});
