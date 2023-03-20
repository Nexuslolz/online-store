import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMenu {
  isOpen: boolean;
}

const initialState: IMenu = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    setMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});
