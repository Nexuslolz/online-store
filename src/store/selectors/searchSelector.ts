import { IProduct } from '../../models/models';
import { RootState } from '../store';

export const getSearchParams = (state: RootState): [IProduct[] | null, boolean, string, string] => {
  const searchData: IProduct[] | null = state.search.searchValue;
  const searchLoading: boolean | undefined = state.search.loading;
  const searchError = state.search.error;
  const searchParam: string = state.search.param;

  return [searchData, searchLoading, searchError, searchParam];
};
