import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderDetailsState {
  orderId: string | null;
}

const initialState: OrderDetailsState = {
  orderId: null,
};

export interface OrderCreateRequest {
  ingredients: Array<string>;
}

const orderCreateRequestURL = "https://norma.nomoreparties.space/api/orders";

export const checkoutOrder = createAsyncThunk(
  "checkoutOrder",
  async (payload: OrderCreateRequest) => {
    return await fetch(orderCreateRequestURL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(`Ошибка ${resp.status}`);
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
    builder.addCase(checkoutOrder.fulfilled, (state, action) => ({
      orderId: action.payload.order.number,
    }));
    builder.addCase(checkoutOrder.rejected, () => initialState);
  },
});

export default OrderDetailsSlice.reducer;

export const { setOrderDetails, resetOrderDetails } = OrderDetailsSlice.actions;
