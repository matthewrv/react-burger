import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredients";
import selectedIngredientsSlice from "./selected-ingredients";
import orderDetailsSlice from "./order-details";
import authSlice from "./auth";
import ordersFeedSlice from "./orders-feed/slice";
import profileFeedSlice from "./profile-feed/slice";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  connect,
  disconnect,
  onClose,
  onConnecting,
  onError,
  onMessage,
  onOpen,
} from "./orders-feed/actions";

import {
  connect as profileConnect,
  disconnect as profileDisconnect,
  onClose as profileClose,
  onConnecting as profileOnConnecting,
  onError as profileOnError,
  onMessage as profileOnMessage,
  onOpen as profileOnOpen,
} from "./profile-feed/actions";

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  selectedIngredients: selectedIngredientsSlice,
  orderDetails: orderDetailsSlice,
  auth: authSlice,
  ordersFeed: ordersFeedSlice,
  profileFeed: profileFeedSlice,
});

const ordersFeedSocketMiddleware = socketMiddleware({
  connect,
  disconnect,
  onConnecting,
  onOpen,
  onError,
  onMessage,
  onClose,
});

const profileFeedSocketMiddleware = socketMiddleware(
  {
    connect: profileConnect,
    disconnect: profileDisconnect,
    onConnecting: profileOnConnecting,
    onOpen: profileOnOpen,
    onError: profileOnError,
    onMessage: profileOnMessage,
    onClose: profileClose,
  },
  true
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      ordersFeedSocketMiddleware,
      profileFeedSocketMiddleware
    );
  },
});

export type TAppStore = typeof store;
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
