import { createAction } from "@reduxjs/toolkit";
import { TOrdersFeed } from "../types/orders-feed";

export const connect = createAction<string, "ordersFeed/onConnect">(
  "ordersFeed/onConnect"
);
export const disconnect = createAction("ordersFeed/onDisconnect");

export const onConnecting = createAction("ordersFeed/onConnecting");
export const onOpen = createAction("ordersFeed/onOpen");
export const onError = createAction<string, "ordersFeed/onError">(
  "ordersFeed/onError"
);
export const onClose = createAction("ordersFeed/onClose");
export const onMessage = createAction<TOrdersFeed, "ordersFeed/onMessage">(
  "ordersFeed/onMessage"
);

export type OrdersFeedActionTypes =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof onConnecting>
  | ReturnType<typeof onError>
  | ReturnType<typeof onMessage>
  | ReturnType<typeof onOpen>
  | ReturnType<typeof onClose>;
