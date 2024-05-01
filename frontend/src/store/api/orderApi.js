import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders/new",
        method: "POST",
        body,
      }),
    }),
    createStripeOrder: builder.mutation({
      query: (body) => ({
        url: "/payment/stripe-checkout",
        method: "POST",
        body,
      }),
    }),
    getAllOrdersForUser: builder.query({
      query: () => ({
        url: "/orders",
      }),
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      // keepUnusedDataFor: 180,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateStripeOrderMutation,
  useGetAllOrdersForUserQuery,
  useGetSingleOrderQuery,
} = orderApi;
