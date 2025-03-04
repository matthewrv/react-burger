import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRemoveIngredientPayload {
  id: string;
}

export interface ISelectedIngredientItem {
  id: string;
  ingredientId: string;
}

export interface ISelectedIngredientsState {
  bun: ISelectedIngredientItem | null;
  ingredients: ISelectedIngredientItem[];
}

const initialState: ISelectedIngredientsState = {
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
      reducer: (state, action: PayloadAction<ISelectedIngredientItem>) => {
        state.ingredients.push(action.payload);
      },
      prepare: prepareSelectedIngredient,
    },
    removeIngredient: (
      state,
      action: PayloadAction<IRemoveIngredientPayload>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setBun: {
      reducer: (state, action: PayloadAction<ISelectedIngredientItem>) => {
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
