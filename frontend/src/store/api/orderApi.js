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
    }),
    getSales: builder.query({
      query: (params) => ({
        url: "/admin/get_sales",
        params: {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      }),
    }),
    getAllOrdersForAdmin: builder.query({
      query: () => ({
        url: "/admin/orders",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateStripeOrderMutation,
  useGetAllOrdersForUserQuery,
  useGetSingleOrderQuery,
  useLazyGetSalesQuery,
  useGetAllOrdersForAdminQuery,
} = orderApi;
