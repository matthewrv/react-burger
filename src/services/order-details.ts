import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../utils/normaApi/norma-api";
import {
  TOrderCreateRequest,
  TOrderCreateResponse,
  TOrderResponse,
} from "../utils/normaApi/models";
import { clearIngredients } from "./selected-ingredients";
import { resetAllItemsCount } from "./ingredients";
import { TRequestStatus } from "../utils/normaApi/models";
import { TOrderItem } from "../utils/normaApi/models";

export type TOrderDetailsState = {
  number: number | null;
  order?: TOrderItem;
  createOrderStatus: TRequestStatus;
};

const initialState: TOrderDetailsState = {
  number: null,
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

export const requestOrderByNumber = createAsyncThunk(
  "requestOrder",
  (payload: { number: string }) => {
    return request<TOrderResponse>(
      `/orders/${payload.number}`,
      {
        method: "GET",
      },
      true
    );
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
    builder
      .addCase(checkoutOrder.fulfilled, (_, action) => ({
        number: action.payload.order.number,
        createOrderStatus: "success",
      }))
      .addCase(checkoutOrder.rejected, () => ({
        ...initialState,
        createOrderStatus: "error",
      }))
      .addCase(checkoutOrder.pending, () => initialState)
      .addCase(requestOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
      });
  },
});

export default OrderDetailsSlice.reducer;

export const { setOrderDetails, resetOrderDetails } = OrderDetailsSlice.actions;
