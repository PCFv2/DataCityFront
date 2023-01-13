import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { webSocket?: WebSocket } = {
  webSocket: undefined,
};

export const webSocketSlice = createSlice({
  name: "webSocketSlice",
  initialState,
  reducers: {
    setWebSocket: (state, action: PayloadAction<WebSocket>) => {
      state.webSocket = action.payload;
    },
  },
});

export const { setWebSocket } = webSocketSlice.actions;
export default webSocketSlice.reducer;
