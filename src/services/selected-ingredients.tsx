import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface selectIngredientPayload {
  id: string;
}

export interface SelectedIngredientItem {
  id: string;
  ingredientId: string;
}

export interface SelectedIngredientsState {
  bun: SelectedIngredientItem | null;
  ingredients: SelectedIngredientItem[];
}

const initialState: SelectedIngredientsState = {
  bun: null,
  ingredients: [],
};

const selectedIngridietsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<selectIngredientPayload>) => {
      state.ingredients.push({
        id: crypto.randomUUID(),
        ingredientId: action.payload.id,
      });
    },
    removeIngredient: (
      state,
      action: PayloadAction<selectIngredientPayload>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setBun: (state, action: PayloadAction<selectIngredientPayload>) => {
      state.bun = { id: crypto.randomUUID(), ingredientId: action.payload.id };
    },
    resetBun: (state) => {
      state.bun = null;
    },
    swapElements: (
      state,
      action: PayloadAction<{ dragIndex?: number; hoverIndex?: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;

      if (
        typeof dragIndex === "undefined" ||
        typeof hoverIndex === "undefined"
      ) {
        return;
      }

      const ingredients = [...state.ingredients];
      ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0]);
      return {
        ...state,
        ingredients: ingredients,
      };
    },
  },
});

export default selectedIngridietsSlice.reducer;

export const { addIngredient, setBun, removeIngredient, swapElements } =
  selectedIngridietsSlice.actions;
