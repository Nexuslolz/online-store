import { RootState } from '../store';

export const getSearchValue = (state: RootState) => {
  return state.search.searchValue;
};
