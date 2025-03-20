import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredients";
import selectedIngredientsSlice from "./selected-ingredients";
import orderDetailsSlice from "./order-details";
import authSlice from "./auth";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    selectedIngredients: selectedIngredientsSlice,
    orderDetails: orderDetailsSlice,
    auth: authSlice,
  },
});

export type TAppStore = typeof store;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
