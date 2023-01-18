import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DisplayComponent = {
  displayComponent: string;
  socketCode?: string;
  isLoading?: boolean;
};

const initialState: DisplayComponent = {
  displayComponent: "",
  socketCode: undefined,
  isLoading: false,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clear: (state) => {
      state.displayComponent = "";
      state.socketCode = undefined;
    },
  },
});

export const { setDisplayComponent, setSocketCode, clear, setIsLoading } =
  displayComponentSlice.actions;

export default displayComponentSlice.reducer;
