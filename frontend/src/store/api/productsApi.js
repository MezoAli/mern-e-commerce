import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page: params.page,
          keyword: params.keyword,
          seller: params.seller,
          priceGTE: params.priceGTE,
          rating: params.rating,
          category: params.category,
          priceLTE: params.priceLTE,
        },
      }),
    }),
    getSingleProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductDetailsQuery } =
  productsApi;
