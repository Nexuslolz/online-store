import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IList {
  isList: boolean;
}

const initialState: IList = {
  isList: false,
};

export const listSlice = createSlice({
  name: 'listSlice',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<boolean>) {
      state.isList = action.payload;
    },
  },
});
