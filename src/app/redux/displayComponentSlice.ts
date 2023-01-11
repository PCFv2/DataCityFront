import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DisplayComponent = {
  displayComponent: string;
  socketCode?: string;
};

const initialState: DisplayComponent = {
  displayComponent: "",
  socketCode: undefined,
};

export const displayComponentSlice = createSlice({
  name: "displayComponentSlice",
  initialState,
  reducers: {
    setDisplayComponent: (state, action: PayloadAction<string>) => {
      state.displayComponent = action.payload;
    },
    setSocketCode: (state, action: PayloadAction<string>) => {
      state.socketCode = action.payload;
    },
    clear: (state) => {
      state.displayComponent = "";
      state.socketCode = undefined;
    },
  },
});

export const { setDisplayComponent, setSocketCode, clear } =
  displayComponentSlice.actions;

export default displayComponentSlice.reducer;
