import { RootState } from '../store';

export const getIsList = (state: RootState): boolean => {
  return state.list.isList;
};
