import { createAction } from "@reduxjs/toolkit";
import { TOrdersFeed } from "./slice";

export const connect = createAction<string, "profileFeed/onConnect">(
  "profileFeed/onConnect"
);
export const disconnect = createAction("profileFeed/onDisconnect");

export const onConnecting = createAction("profileFeed/onConnecting");
export const onOpen = createAction("profileFeed/onOpen");
export const onError = createAction<string, "profileFeed/onError">(
  "profileFeed/onError"
);
export const onClose = createAction("profileFeed/onClose");
export const onMessage = createAction<TOrdersFeed, "profileFeed/onMessage">(
  "profileFeed/onMessage"
);

export type OrdersFeedActionTypes =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof onConnecting>
  | ReturnType<typeof onError>
  | ReturnType<typeof onMessage>
  | ReturnType<typeof onOpen>
  | ReturnType<typeof onClose>;
