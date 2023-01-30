import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User & { lastNbPoints: number } = {
  userId: "",
  name: "",
  gameId: 0,
  nbPoints: 0,
  isAlive: false,
  lastNbPoints: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setGameId: (state, action: PayloadAction<number>) => {
      state.gameId = action.payload;
    },
    setNbPoints: (state, action: PayloadAction<number>) => {
      state.nbPoints = action.payload;
    },
    setIsAlive: (state, action: PayloadAction<boolean>) => {
      state.isAlive = action.payload;
    },
    setLastNbPoints: (state, action: PayloadAction<number>) => {
      state.lastNbPoints = action.payload;
    },
  },
});

export const {
  setUserId,
  setName,
  setGameId,
  setNbPoints,
  setIsAlive,
  setLastNbPoints,
} = userSlice.actions;
export default userSlice.reducer;
