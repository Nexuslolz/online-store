import { RootState } from '../store';

export const getTotalFound = (state: RootState): string => {
  return state.totalFound.amount;
};
