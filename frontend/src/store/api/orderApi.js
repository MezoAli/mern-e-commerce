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
  }),
});

export const { useCreateOrderMutation, useCreateStripeOrderMutation } =
  orderApi;
