import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBurgerIngredient } from "./common";

export interface IIngredientDetailState {
  ingredient: IBurgerIngredient | null;
}

const initialState: IIngredientDetailState = {
  ingredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetail",
  initialState,
  reducers: {
    setIngredient: (_, action: PayloadAction<IBurgerIngredient | null>) => {
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
