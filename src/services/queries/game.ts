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
    getRoundByGameId: builder.query<Round, GameIdAndRoundId>({
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
      NextRound & { gameId: number; userId: string }
    >({
      query: ({ gameId, userId, ...nextRound }) => ({
        url: `${gameId}/user/${userId}`,
        method: "PUT",
        body: nextRound,
      }),
    }),
    //game/{gameId}/lastround
    getLastround: builder.query<Round, number>({
      query: (id) => `/${id}/lastround`,
    }),
    getUserAttacks: builder.query<UserAttacks[], {gameId: number, roundId:number, userId: string}>({
      query: ({gameId, roundId, userId}) => `/${gameId}/round/${roundId}/user/${userId}/attacks`,
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
  useSetFinishedMutation,
  useGetLastroundQuery,
  useGetUserAttacksQuery,
} = gameApi;
