import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Game = {
  gameId: 0,
  hostId: "",
  maxPlayers: 0,
  startNbPoints: 0,
  difficulty: 0,
};

export const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
    setHostId: (state, action: PayloadAction<string>) => {
      state.hostId = action.payload;
    },
    setStartNbPoints: (state, action: PayloadAction<number>) => {
      state.startNbPoints = action.payload;
    }
  },
});

export const { setGameId, setHostId, setStartNbPoints } = gameSlice.actions;

export default gameSlice.reducer;
