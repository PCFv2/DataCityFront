import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

const initialState: Round = {
  roundId: 0,
  roundNumber: 0,
  gameId: 0,
  currentlyAlive: "",
  statusId: 0,
  realAttacksNb: 0,
};

export const roundSlice = createSlice({
  name: "roundSlice",
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<Round>) => {
      return {
        ...action.payload,
      };
    },
    setRoundStatus: (state, action: PayloadAction<number>) => {
      state.statusId = action.payload
    }
  },
});

export const { setRound, setRoundStatus } = roundSlice.actions;
export default roundSlice.reducer;
