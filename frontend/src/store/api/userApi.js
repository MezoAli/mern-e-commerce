import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../slices/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/auth" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/me",
      providesTags: ["User"],

      //   transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          console.log(error);
          dispatch(setLoading(false));
        }
      },
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: "/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: "/me/upload_avatar",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/password/update",
        method: "PUT",
        body,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/password/forget",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ body, token }) => ({
        url: `/password/reset/${token}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = userApi;
