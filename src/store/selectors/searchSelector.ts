import { IProduct } from '../../models/models';
import { RootState } from '../store';

export const getSearchParams = (state: RootState): [IProduct[] | null, boolean, string] => {
  const searchData: IProduct[] | null = state.search.searchValue;
  const searchLoading: boolean | undefined = state.search.loading;
  const searchError = state.search.error;

  return [searchData, searchLoading, searchError];
};
