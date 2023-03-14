import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as API from '../../constants/API';
import { IProduct, IProducts } from '../../models/models';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API.DOMAIN }),
  endpoints: (build) => ({
    fetchProducts: build.query<IProducts, string>({
      query: (limit: string) => ({
        url: API.PRODUCT,
        params: {
          limit: limit,
        },
      }),
    }),

    fetchOneProduct: build.query<IProduct, string>({
      query: (id: string) => ({
        url: `${API.PRODUCT}/${id}`,
      }),
    }),

    fetchDifiniteProduct: build.query<IProducts, string>({
      query: (q: string) => ({
        url: `${API.PRODUCT}/${API.SEARCH}`,
        params: {
          q: q,
        },
      }),
    }),
  }),
});

export const { useFetchProductsQuery, useLazyFetchDifiniteProductQuery, useFetchOneProductQuery } = productAPI;
