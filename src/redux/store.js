import { configureStore } from "@reduxjs/toolkit";
import temSlice from "./slice/tem";
import linksSlice from "./slice/linksSlice";
import qrandtextSlice from "./slice/qrandtextSlice";

const store = configureStore({
  reducer: {
    tem: temSlice,
    links: linksSlice,
    qrandtexts: qrandtextSlice,
  },
});

export default store;
