import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import normaApi from "../utils/normaApi/normaApi";
import {
  OrderCreateRequest,
  OrderCreateResponse,
} from "../utils/normaApi/models";
import { clearIngredients } from "./selected-ingredients";

export interface OrderDetailsState {
  orderId: string | null;
}

const initialState: OrderDetailsState = {
  orderId: null,
};

export const checkoutOrder = createAsyncThunk(
  "checkoutOrder",
  (payload: OrderCreateRequest, thunkApi) => {
    return normaApi<OrderCreateResponse>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      thunkApi.dispatch(clearIngredients());
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
    }));
    builder.addCase(checkoutOrder.rejected, () => initialState);
  },
});

export default OrderDetailsSlice.reducer;

export const { setOrderDetails, resetOrderDetails } = OrderDetailsSlice.actions;
