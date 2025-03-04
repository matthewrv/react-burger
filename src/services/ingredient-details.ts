import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBurgerIngredient } from "./common";

export type TIngredientDetailState = {
  ingredient: TBurgerIngredient | null;
}

const initialState: TIngredientDetailState = {
  ingredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetail",
  initialState,
  reducers: {
    setIngredient: (_, action: PayloadAction<TBurgerIngredient | null>) => {
      return { ingredient: action.payload };
    },
    resetIngredient: () => {
      return initialState;
    },
  },
});

export default ingredientDetailsSlice.reducer;

export const { setIngredient, resetIngredient } =
  ingredientDetailsSlice.actions;
