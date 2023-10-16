import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from ".././../Components/BaseUrl";

export let fetchLink = createAsyncThunk("fetchLink", async (uid) => {
  let { data } = await axios.get(`${BaseUrl}/api/link/${uid}`);

  return data;
});

let linksSlice = createSlice({
  name: "links",
  initialState: [],
  reducers: {
    deleteLink: (state, action) => {
      return state.filter((link) => link._id !== action.payload._id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLink.pending, (state, action) => {});
    builder.addCase(fetchLink.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
//Acctions
export let { deleteLink } = linksSlice.actions;
export let alllinks = (state) => state.links;
export default linksSlice.reducer;
