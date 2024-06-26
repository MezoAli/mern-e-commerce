import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { setIsAuthenticated, setLoading, setUser } from "../slices/userSlice";

// const BACKEND_API_URL = import.meta.env.VITE_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/v1/auth`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUserProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    RegisterUser: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    logoutUser: builder.query({
      query: () => "/logout",
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
        dispatch(setLoading(false));
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyLogoutUserQuery,
} = authApi;
