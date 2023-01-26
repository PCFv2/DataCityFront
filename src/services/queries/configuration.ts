import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const configurationApi = createApi({
  reducerPath: "configurationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL_DEV + "/configuration",
  }),
  endpoints: (builder) => ({
    getAllConfiguration: builder.query<Configuration[], void>({
      query: () => "/",
    }),
  }),
});

export const { useGetAllConfigurationQuery } = configurationApi;
