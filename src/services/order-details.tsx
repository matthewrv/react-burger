import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../utils/normaApi/norma-api";
import {
  OrderCreateRequest,
  OrderCreateResponse,
} from "../utils/normaApi/models";
import { clearIngredients } from "./selected-ingredients";
import { resetAllItemsCount } from "./ingredients";
import { RequestStatus } from "./common";

export interface OrderDetailsState {
  orderId: string | null;
  createOrderStatus: RequestStatus;
}

const initialState: OrderDetailsState = {
  orderId: null,
  createOrderStatus: "request",
};

export const checkoutOrder = createAsyncThunk(
  "checkoutOrder",
  (payload: OrderCreateRequest, thunkApi) => {
    return request<OrderCreateResponse>(
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
    setOrderDetails: (_, action: PayloadAction<OrderDetailsState>) => {
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
