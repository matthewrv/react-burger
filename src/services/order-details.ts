import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../utils/normaApi/norma-api";
import {
  TOrderCreateRequest,
  TOrderCreateResponse,
} from "../utils/normaApi/models";
import { clearIngredients } from "./selected-ingredients";
import { resetAllItemsCount } from "./ingredients";
import { TRequestStatus } from "./common";

export type TOrderDetailsState = {
  orderId: string | null;
  createOrderStatus: TRequestStatus;
}

const initialState: TOrderDetailsState = {
  orderId: null,
  createOrderStatus: "request",
};

export const checkoutOrder = createAsyncThunk(
  "checkoutOrder",
  (payload: TOrderCreateRequest, thunkApi) => {
    return request<TOrderCreateResponse>(
      "/orders",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      },
      true
    ).then((response) => {
      thunkApi.dispatch(clearIngredients());
      thunkApi.dispatch(resetAllItemsCount());
      return response;
    });
  }
);

const OrderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderDetails: (_, action: PayloadAction<TOrderDetailsState>) => {
      return action.payload;
    },
    resetOrderDetails: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkoutOrder.fulfilled, (_, action) => ({
      orderId: action.payload.order.number,
      createOrderStatus: "success",
    }));
    builder.addCase(checkoutOrder.rejected, () => ({
      ...initialState,
      createOrderStatus: "error",
    }));
    builder.addCase(checkoutOrder.pending, () => initialState);
  },
});

export default OrderDetailsSlice.reducer;

export const { setOrderDetails, resetOrderDetails } = OrderDetailsSlice.actions;
