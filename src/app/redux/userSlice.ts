import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  userId: "",
  name: "",
  gameId: 0,
  nbPoints: 0,
  isAlive: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
