import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "../services";
import HosterSlice from "../features/game/slice";
import { configurationApi } from "../services";
import { userApi } from "../services/queries/user";

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    [configurationApi.reducerPath]: configurationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    hoster: HosterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      gameApi.middleware,
      configurationApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
