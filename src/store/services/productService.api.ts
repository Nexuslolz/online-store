import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import * as API from '../../constants/API';
import { IProducts } from '../../models/models';

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
  }),
});

export const { useFetchProductsQuery } = productAPI;
