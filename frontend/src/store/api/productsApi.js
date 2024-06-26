import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BACKEND_API_URL = import.meta.env.VITE_API_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1`,
  }),
  tagTypes: ["Product", "AllProducts", "ProductReviews"],
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
    getAllProductForAdmin: builder.query({
      query: () => ({
        url: `/admin/products`,
      }),
      providesTags: ["AllProducts"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `/products/reviews`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product", "AllProducts"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/admin/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AllProducts"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/admin/products/${productId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product", "AllProducts"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllProducts"],
    }),
    uploadProductImages: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/admin/products/${productId}/upload_images`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteSingleProductImage: builder.mutation({
      query: ({ body, productId }) => ({
        url: `/admin/products/${productId}/delete_image`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    getReviewsForProduct: builder.query({
      query: (productId) => ({
        url: `/admin/products/reviews/${productId}`,
      }),
      providesTags: ["ProductReviews"],
    }),
    deleteReview: builder.mutation({
      query: (params) => ({
        url: `/products/reviews`,
        method: "DELETE",
        params: {
          productId: params.productId,
          reviewId: params.reviewId,
        },
      }),
      invalidatesTags: ["Product", "ProductReviews"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductDetailsQuery,
  useAddReviewMutation,
  useGetAllProductForAdminQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImagesMutation,
  useDeleteSingleProductImageMutation,
  useLazyGetReviewsForProductQuery,
  useDeleteReviewMutation,
} = productsApi;
