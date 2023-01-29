import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { botIsActive?: boolean } = {
  botIsActive: false,
};

export const botSlice = createSlice({
  name: "botSlice",
  initialState,
  reducers: {
    setBotIsActive: (state, action: PayloadAction<boolean>) => {
      state.botIsActive = action.payload;
    },
  },
});

export const { setBotIsActive } = botSlice.actions;

export default botSlice.reducer;
