import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "../services/queries/game";
import HosterSlice from "../features/game/slice";

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    hoster: HosterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
