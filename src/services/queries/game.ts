import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/game",
  }),
  endpoints: (builder) => ({
    getGameById: builder.query<Game, number>({
      query: (id) => `/${id}`,
    }),
    getGames: builder.query<Game[], void>({
      query: () => "/",
    }),
    getRoundsByGameId: builder.query<Round[], number>({
      query: (id) => `/${id}/round`,
    }),
    getRoudByGameId: builder.query<Round, GameIdAndRoundId>({
      query: (GameIdAndRoundId) =>
        `/${GameIdAndRoundId.gameId}/round/${GameIdAndRoundId.roundId}`,
    }),
    getJoinGameById: builder.query<boolean, number>({
      query: (id) => `/${id}/join`,
    }),
    getUserByGameId: builder.query<User[], number>({
      query: (id) => `/${id}/user`,
    }),
    putUserByGameId: builder.mutation<User, User & { gameId: number }>({
      query: ({ gameId, ...putData }) => ({
        url: `/${gameId}/user`,
        method: "PUT",
        body: putData,
      }),
    }),
    putGameById: builder.mutation<Game, HosterGameForm & { gameId: number }>({
      query: ({ gameId, ...putData }) => ({
        url: `/${gameId}`,
        method: "PUT",
        body: putData,
      }),
    }),
    // Join game
    postJoinGameById: builder.mutation<void, number>({
      query: (id) => ({
        url: `${id}/join`,
        method: "POST",
        body: id,
      }),
    }),
    postCreateGame: builder.mutation<void, void>({
      query: () => ({
        url: "/create",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetGameByIdQuery,
  useGetGamesQuery,
  useGetRoundsByGameIdQuery,
  usePostJoinGameByIdMutation,
  useGetJoinGameByIdQuery,
  usePutUserByGameIdMutation,
  usePostCreateGameMutation,
  usePutGameByIdMutation,
  useGetUserByGameIdQuery,
} = gameApi;
