import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "../services";
import HosterSlice from "../features/game/slice";
import { configurationApi } from "../services";

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    [configurationApi.reducerPath]: configurationApi.reducer,
    hoster: HosterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      gameApi.middleware,
      configurationApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
