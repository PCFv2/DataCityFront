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
  }),
});

export const { useGetUserByIdQuery } = userApi;
