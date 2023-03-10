import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITotal {
  amount: string;
}

const initialState: ITotal = {
  amount: ' ',
};

export const totalSlice = createSlice({
  name: 'totalFound',
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
  },
});
