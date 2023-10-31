import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from ".././../Components/BaseUrl";

export let fetchLink = createAsyncThunk("fetchLink", async (uid) => {
  let { data } = await axios.get(`${BaseUrl}/api/link/${uid}`);

  return data;
});

let linksSlice = createSlice({
  name: "links",
  initialState: {
    isLoading: false,
    data: [],
  },
  reducers: {
    deleteLink: (state, action) => {
      state.data = state.data.filter((link) => link._id !== action.payload._id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLink.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLink.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  },
});
//Acctions
export let { deleteLink } = linksSlice.actions;
export let alllinks = (state) => state.links;
export default linksSlice.reducer;
