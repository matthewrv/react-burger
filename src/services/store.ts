import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredients";
import selectedIngredientsSlice from "./selected-ingredients";
import orderDetailsSlice from "./order-details";
import authSlice from "./auth";
import ordersFeedSlice from "./orders-feed/slice";
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

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  selectedIngredients: selectedIngredientsSlice,
  orderDetails: orderDetailsSlice,
  auth: authSlice,
  ordersFeed: ordersFeedSlice,
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

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(ordersFeedSocketMiddleware);
  },
});

export type TAppStore = typeof store;
export type TRootState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;
