import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RemoveIngredientPayload {
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

const prepareSelectedIngredient = (ingredientId: string) => {
  const constructorItemId = crypto.randomUUID();
  return {
    payload: { id: constructorItemId, ingredientId: ingredientId },
  };
};

const selectedIngridietsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    clearIngredients: () => initialState,
    addIngredient: {
      reducer: (state, action: PayloadAction<SelectedIngredientItem>) => {
        state.ingredients.push(action.payload);
      },
      prepare: prepareSelectedIngredient,
    },
    removeIngredient: (
      state,
      action: PayloadAction<RemoveIngredientPayload>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setBun: {
      reducer: (state, action: PayloadAction<SelectedIngredientItem>) => {
        state.bun = action.payload;
      },
      prepare: prepareSelectedIngredient,
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

export const {
  addIngredient,
  setBun,
  removeIngredient,
  swapElements,
  clearIngredients,
} = selectedIngridietsSlice.actions;
