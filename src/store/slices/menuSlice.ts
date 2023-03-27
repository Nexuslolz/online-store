import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IMenu {
  isOpen: boolean;
  available: IFilterParams;
  current: IFilterParams;
}

interface IFilterParams {
  categories: string[];
  brands: string[];
  prices: {
    min: number;
    max: number;
  };
  stock: {
    min: number;
    max: number;
  };
}

const initialState: IMenu = {
  isOpen: false,
  available: {
    categories: [],
    brands: [],
    prices: {
      min: 0,
      max: 0,
    },
    stock: {
      min: 0,
      max: 0,
    },
  },
  current: {
    categories: [],
    brands: [],
    prices: {
      min: 0,
      max: 0,
    },
    stock: {
      min: 0,
      max: 0,
    },
  },
};

export const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    setMenu(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },

    setFilterParams(state, action: PayloadAction<IFilterParams>) {
      return {
        ...state,
        available: {
          ...state.available,
          ...action.payload,
        },
      };
    },

    toggleCategory(state, action: PayloadAction<string>) {
      const { categories } = state.current;
      if (categories.includes(action.payload)) {
        state.current.categories = categories.filter((category) => category !== action.payload);
      } else {
        categories.push(action.payload);
      }
    },

    toggleBrand(state, action: PayloadAction<string>) {
      const { brands } = state.current;
      if (brands.includes(action.payload)) {
        state.current.brands = brands.filter((brand) => brand !== action.payload);
      } else {
        brands.push(action.payload);
      }
    },

    changePriceMin(state, action: PayloadAction<number>) {
      state.current.prices.min = action.payload;
    },
    changePriceMax(state, action: PayloadAction<number>) {
      state.current.prices.max = action.payload;
    },
    changeStockMin(state, action: PayloadAction<number>) {
      state.current.stock.min = action.payload;
    },
    changeStockMax(state, action: PayloadAction<number>) {
      state.current.stock.max = action.payload;
    },
  },
});
