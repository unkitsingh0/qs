import { createSlice } from "@reduxjs/toolkit";

const temSlice = createSlice({
  name: "tem",
  initialState: "ankit",
  reducers: {
    tem: (state, action) => {},
  },
});

export let { tem } = temSlice.actions;

export default temSlice.reducer;
