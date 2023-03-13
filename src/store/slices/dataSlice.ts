import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../models/models';

interface IData {
  data: IProduct[] | undefined;
}

const initialState: IData = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IProduct[] | undefined>) {
      state.data = action.payload;
    },
  },
});
