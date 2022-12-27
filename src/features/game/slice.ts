import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Hoster = {
  hasCreateGame: boolean;
};

const initialState: Hoster = {
  hasCreateGame: false,
};

export const hosterSlice = createSlice({
  name: "hosterSlice",
  initialState,
  reducers: {
    setHasCreateGame: (state, action: PayloadAction<boolean>) => {
      state.hasCreateGame = action.payload;
    },
  },
});

export const { setHasCreateGame } = hosterSlice.actions;
export default hosterSlice.reducer;
