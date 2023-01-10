import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SocketCode = 21 | 22 | 23 | 24 | 25;

type DisplayComponent = {
  displayComponent: string;
  socketCode?: SocketCode;
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
    setSocketCode: (state, action: PayloadAction<SocketCode>) => {
      state.socketCode = action.payload;
    },
  },
});

export const { setDisplayComponent, setSocketCode } =
  displayComponentSlice.actions;

export default displayComponentSlice.reducer;
