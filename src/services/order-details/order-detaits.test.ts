import { describe, expect, it } from "vitest";
import {
  checkoutOrder,
  initialState,
  OrderDetailsSlice,
  requestOrderByNumber,
  resetOrderDetails,
  setOrderDetails,
  TOrderDetailsState,
} from "./order-details";
import { TOrderItem } from "../../utils/normaApi/models";

describe("Order details slice", () => {
  const mockState: TOrderDetailsState = {
    number: 12345,
    createOrderStatus: "success",
  };

  it("Should have initial state", () => {
    expect(OrderDetailsSlice.reducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("Should update order details state", () => {
    expect(
      OrderDetailsSlice.reducer(undefined, setOrderDetails(mockState))
    ).toEqual(mockState);
  });

  it("Should reset order details state", () => {
    expect(OrderDetailsSlice.reducer(mockState, resetOrderDetails())).toEqual(
      initialState
    );
  });

  it("Should update on checkoutOrder fulfilled", () => {
    expect(
      OrderDetailsSlice.reducer(undefined, {
        type: checkoutOrder.fulfilled.type,
        payload: {
          order: {
            number: 12345,
          },
        },
      })
    ).toEqual({
      ...initialState,
      number: 12345,
      createOrderStatus: "success",
    });
  });

  it("Should save error status on checkoutOrder rejected", () => {
    expect(
      OrderDetailsSlice.reducer(undefined, {
        type: checkoutOrder.rejected.type,
        error: {
          message: "Checkout failed",
        },
      })
    ).toEqual({
      ...initialState,
      createOrderStatus: "error",
    });
  });

  it("Should save pending status on checkoutOrder pending", () => {
    expect(
      OrderDetailsSlice.reducer(undefined, {
        type: checkoutOrder.pending.type,
      })
    ).toEqual({
      ...initialState,
      createOrderStatus: "request",
    });
  });

  it("Should update order on requestOrder fulfilled", () => {
    const order: TOrderItem = {
      _id: "d0ab40af-933a-40b2-a67d-7d3b697db102",
      createdAt: "2024-04-07T16:17:34Z",
      name: "Test burger",
      number: 12345,
      status: "pending",
      ingredients: [
        "7b74ec1d-5a4c-4dca-a4aa-c8f0c3051696",
        "e5ee944b-57ec-4919-8e0f-5cb995ec2905",
      ],
    };

    expect(
      OrderDetailsSlice.reducer(undefined, {
        type: requestOrderByNumber.fulfilled.type,
        payload: {
          orders: [order],
        },
      })
    ).toEqual({
      ...initialState,
      order,
    });
  });
});
