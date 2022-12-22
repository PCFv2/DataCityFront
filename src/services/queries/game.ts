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
    // Join game
    postJoinPartyByGameId: builder.mutation<void, number>({
      query: (id) => ({
        url: `${id}/join`,
        method: "POST",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetGameByIdQuery,
  useGetGamesQuery,
  useGetRoundsByGameIdQuery,
  usePostJoinPartyByGameIdMutation,
} = gameApi;
