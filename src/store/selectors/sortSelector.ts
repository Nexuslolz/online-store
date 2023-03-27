import { RootState } from '../store';

export const getSort = (state: RootState) => {
  return state.sort.sort;
};
