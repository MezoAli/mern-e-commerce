import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/me",
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useLogoutUserMutation } = userApi;
