import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./ingredients";
import selectedIngredientsSlice from "./selected-ingredients";
import ingredientsDetailsSlice from "./ingredient-details";
import orderDetailsSlice from "./order-details";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    selectedIngredients: selectedIngredientsSlice,
    indgidientDetails: ingredientsDetailsSlice,
    orderDetails: orderDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
