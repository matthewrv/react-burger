import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BurgerIngredient } from "./common";

export interface IngredientDetailState {
  ingredient: BurgerIngredient | null;
}

const initialState: IngredientDetailState = {
  ingredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetail",
  initialState,
  reducers: {
    setIngredient: (_, action: PayloadAction<BurgerIngredient | null>) => {
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
