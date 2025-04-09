import { describe, expect, it } from "vitest";
import { initialState, ordersFeed } from "./slice";
import { TOrdersFeed } from "../types/orders-feed";
import { onClose, onConnecting, onError, onMessage, onOpen } from "./actions";

describe("Orders feed slice", () => {
  it("should return initial state", () => {
    expect(ordersFeed.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should update connection state on connecting", () => {
    expect(ordersFeed.reducer(undefined, onConnecting())).toEqual({
      ...initialState,
      status: "CONNECTING",
    });
  });

  it("should update connection state on open", () => {
    expect(ordersFeed.reducer(undefined, onOpen())).toEqual({
      ...initialState,
      status: "ONLINE",
    });
  });

  it("should update connection state on close", () => {
    expect(ordersFeed.reducer(undefined, onClose())).toEqual({
      ...initialState,
      status: "OFFLINE",
    });
  });

  it("should update error state on error", () => {
    expect(ordersFeed.reducer(undefined, onError("Something failed"))).toEqual({
      ...initialState,
      error: "Something failed",
    });
  });

  it("should set orders on message", () => {
    const newOrdersFeed: TOrdersFeed = {
      orders: [
        {
          _id: "d0ab40af-933a-40b2-a67d-7d3b697db102",
          createdAt: "2024-04-07T16:17:34Z",
          name: "Test burger",
          number: 12345,
          status: "pending",
          ingredients: [
            "7b74ec1d-5a4c-4dca-a4aa-c8f0c3051696",
            "e5ee944b-57ec-4919-8e0f-5cb995ec2905",
          ],
        },
      ],
      total: 123,
      totalToday: 23,
    };
    expect(ordersFeed.reducer(undefined, onMessage(newOrdersFeed))).toEqual({
      ...initialState,
      ...newOrdersFeed,
    });
  });
});
