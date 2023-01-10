import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DisplayComponent = {
  displayComponent: string;
};

const initialState: DisplayComponent = {
  displayComponent: "",
};

export const displayComponentSlice = createSlice({
  name: "displayComponentSlice",
  initialState,
  reducers: {
    setDisplayComponent: (state, action: PayloadAction<string>) => {
      state.displayComponent = action.payload;
    },
  },
});

export const { setDisplayComponent } = displayComponentSlice.actions;

export default displayComponentSlice.reducer;
