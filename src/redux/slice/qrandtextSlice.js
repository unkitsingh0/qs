import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../../Components/BaseUrl";

export let fetchqrandtext = createAsyncThunk("fetchqrandtext", async (uid) => {
  let { data } = await axios.get(`${BaseUrl}/api/qr/${uid}`);

  return data;
});

let qrAndTextSlice = createSlice({
  name: "qrandtexts",
  initialState: [],
  reducers: {
    deleteQrText: (state, action) => {
      return state.filter((link) => link._id !== action.payload._id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchqrandtext.pending, (state, action) => {});
    builder.addCase(fetchqrandtext.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
//Acctions
export let { deleteQrText } = qrAndTextSlice.actions;
export let allQrAndTexts = (state) => state.qrandtexts;
export default qrAndTextSlice.reducer;
