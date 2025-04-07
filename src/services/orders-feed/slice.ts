import { createSlice } from "@reduxjs/toolkit";
import { onClose, onConnecting, onError, onMessage, onOpen } from "./actions";
import { TOrdersFeedState } from "../types/orders-feed";

export const initialState: TOrdersFeedState = {
  status: "OFFLINE",
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersFeed = createSlice({
  name: "ordersFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onConnecting, (state) => {
        state.status = "CONNECTING";
      })
      .addCase(onOpen, (state) => {
        state.status = "ONLINE";
      })
      .addCase(onClose, (state) => {
        state.status = "OFFLINE";
      })
      .addCase(onError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
});

export default ordersFeed.reducer;
