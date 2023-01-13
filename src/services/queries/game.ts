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
    getAllUsersByGameId: builder.query<User[], number>({
      query: (id) => `/${id}/user`,
    }),
    putUserByGameId: builder.mutation<PutUser, PutUser & { gameId: number }>({
      query: ({ gameId, ...putData }) => ({
        url: `/${gameId}/user`,
        method: "PUT",
        body: putData,
      }),
    }),
    putGameById: builder.mutation<Game, PartialGame & { gameId: number }>({
      query: ({ gameId, ...putData }) => ({
        url: `/${gameId}`,
        method: "PUT",
        body: putData,
      }),
    }),
    putUserConfigurationByGameId: builder.mutation<
      UserConfiguration,
      UserConfiguration & { gameId: number; userId: string }
    >({
      query: ({ gameId, userId, ...putData }) => ({
        url: `/${gameId}/user/${userId}/configuration`,
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
    postCreateGame: builder.mutation<number, void>({
      query: () => ({
        url: "/create",
        method: "POST",
      }),
    }),
    //game/{gameId}/round/{roundId}/user/{userId}/
    setFinished: builder.mutation<
      void,
      { gameId: number; roundId: number; userId: string }
    >({
      query: (data) => ({
        url: `${data.gameId}/round/${data.roundId}/user/${data.userId}/`,
        method: "PUT",
      }),
    }),
    //game/{gameId}/lastround
    getLastround: builder.query<Round, number>({
      query: (id) => `/${id}/lastround`,
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
  useGetAllUsersByGameIdQuery,
  usePutUserConfigurationByGameIdMutation,
  useSetFinishedMutation,
  useGetLastroundQuery,
} = gameApi;
