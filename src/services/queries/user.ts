import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/user",
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<FullUserData, string>({
      query: (id) => `/${id}`,
    }),
    putUserById: builder.mutation<FullUserData, PutUser & { userId: string }>({
      query: ({ userId, ...putData }) => ({
        url: `/${userId}`,
        method: "PUT",
        body: putData,
      }),
    }),
    getUserConfiguration: builder.query<UserConfiguration[], string>({
      query: (id) => `/${id}/configuration`,
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  usePutUserByIdMutation,
  useGetUserConfigurationQuery,
} = userApi;
export default userApi;
