import { createSlice } from "@reduxjs/toolkit";
import { onClose, onConnecting, onError, onMessage, onOpen } from "./actions";
import { WebsocketStatus } from "../types/websocket";

export type TOrderStatus = "done" | "in_progress" | "cancelled";

export type TOrderItem = {
  _id: string;
  number: number;
  createdAt: string;
  status: TOrderStatus;
  name: string;
  ingredients: ReadonlyArray<string>;
};

export type TOrdersFeedResponse = {
  success: boolean;
  orders: ReadonlyArray<TOrderItem>;
  total: number;
  totalToday: number;
};

export type TOrdersFeed = Omit<TOrdersFeedResponse, "success"> & {
  status: WebsocketStatus;
  error: string;
};

const initialState: TOrdersFeed = {
  status: "ONLINE",
  error: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

const ordersFeed = createSlice({
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
