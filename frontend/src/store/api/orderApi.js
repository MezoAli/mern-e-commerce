import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./productsApi";

// const BACKEND_API_URL = import.meta.env.VITE_API_URL;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1`,
  }),
  tagTypes: ["AdminOrders", "SingleOrder", "UserOrders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserOrders"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        await dispatch(
          productsApi.endpoints.getAllProductForAdmin.initiate(null)
        );
        for (let i = 0; i < args?.orderItems?.length; i++) {
          dispatch(
            productsApi.endpoints.getSingleProductDetails.initiate(
              args?.orderItems[i]?.product
            )
          );
        }
      },
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
      providesTags: ["UserOrders"],
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
      providesTags: ["AdminOrders"],
    }),
    getOrderDetailsForAdmin: builder.query({
      query: (orderId) => ({
        url: `/admin/orders/${orderId}`,
      }),
      providesTags: ["SingleOrder"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/admin/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminOrders"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `/admin/orders/${orderId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AdminOrders", "SingleOrder"],
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
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useGetOrderDetailsForAdminQuery,
} = orderApi;
