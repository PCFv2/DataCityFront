import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/user",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUserById: builder.query<FullUserData, string>({
      query: (id) => `/${id}`,
      providesTags: ["user"],
    }),
    updateUserById: builder.mutation<
      FullUserData,
      PutUser & { userId: string }
    >({
      query: ({ userId, ...putData }) => ({
        url: `/${userId}`,
        method: "PUT",
        body: putData,
      }),
      invalidatesTags: ["user"],
    }),
    getUserConfiguration: builder.query<UserConfiguration[], string>({
      query: (id) => `/${id}/configuration`,
      providesTags: ["user"],
    }),
    putUserConfiguration: builder.mutation<
      UserConfigurationForm,
      UserConfigurationForm & { userId: string }
    >({
      query: ({ userId, ...userConfiguration }) => ({
        url: `${userId}/configuration`,
        method: "PUT",
        body: userConfiguration,
      }),
      invalidatesTags: ["user"],
    }),
    getUserOpponent: builder.query<UserOpponent[], string>({
      query: (id) => `/${id}/opponent`,
      providesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useGetUserConfigurationQuery,
  usePutUserConfigurationMutation,
  useGetUserOpponentQuery,
} = userApi;
export default userApi;
