import { createSlice } from "@reduxjs/toolkit";

export type TOrderStatus = "done" | "in_progress" | "cancelled";

export type TOrderItem = {
  _id: string;
  createdAt: string;
  status: TOrderStatus;
  name: string;
  ingredients: ReadonlyArray<string>;
};

export type TOrdersFeed = {
  orders: ReadonlyArray<TOrderItem>;
  total: number;
  todayTotal: number;
};

const item: TOrderItem = {
  _id: "123456",
  createdAt: "2025-03-21T14:43:22.587Z",
  status: "done",
  name: "Death Star Starship Main бургер",
  ingredients: [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa0941",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa0942",
  ],
};

const items: ReadonlyArray<TOrderItem> = [
  item,
  { ...item, _id: "123455", status: "in_progress" },
  { ...item, _id: "123454", status: "in_progress" },
  { ...item, _id: "123453", status: "done" },
  { ...item, _id: "123452", status: "done" },
];

// FIXME change initial state
const initialState: TOrdersFeed = {
  orders: items,
  total: 28756,
  todayTotal: 138,
};

const ordersFeed = createSlice({
  name: "ordersFeed",
  initialState,
  reducers: {},
});

export default ordersFeed.reducer;
