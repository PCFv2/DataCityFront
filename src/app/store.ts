import { configureStore } from "@reduxjs/toolkit";
import { gameApi } from "../services";
import { configurationApi } from "../services";
import { userApi } from "../services/queries/user";
import userSlice from "./redux/userSlice";
import displayComponentSlice from "./redux/displayComponentSlice";
import gameSlice from "./redux/gameSlice";
import webSocketSlice from "./redux/websocketSlice";
import roundSlice from "./redux/roundSlice";
import botSlice from "./redux/botSlice";

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    [configurationApi.reducerPath]: configurationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userSlice: userSlice,
    displayComponent: displayComponentSlice,
    gameSlice: gameSlice,
    webSocket: webSocketSlice,
    roundSlice: roundSlice,
    botSlice: botSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      gameApi.middleware,
      configurationApi.middleware,
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
