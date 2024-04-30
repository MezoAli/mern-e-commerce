import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Product", "AllProducts"],
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
      providesTags: ["AllProducts"],
      // keepUnusedDataFor: 30,
    }),
    getSingleProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["Product"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `/products/reviews`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product", "AllProducts"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductDetailsQuery,
  useAddReviewMutation,
} = productsApi;
