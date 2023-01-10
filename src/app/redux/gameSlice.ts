import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Game = {
  gameId: 0,
  hostId: 0,
  maxPlayers: 0,
  startNbPoints: 0,
  difficulty: "",
};

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
  },
});

export const { setGameId } = gameSlice.actions;

export default gameSlice.reducer;
