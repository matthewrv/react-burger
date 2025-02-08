import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BurgerIngredient } from "./common";

export interface IngredientsState {
  ingredients: BurgerIngredient[];
  ingredientsRequestStatus: IngredientsRequestStatus;
}

export type IngredientsRequestStatus = "request" | "error" | "success";

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequestStatus: "success",
};

const fetchIngredientsURL = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => {
    return await fetch(fetchIngredientsURL).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(`Ошибка ${resp.status}`);
    });
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    increaseItemCount: (state, action) => {
      state.ingredients = state.ingredients.map((item) =>
        item._id !== action.payload.id ? item : { ...item, __v: item.__v + 1 }
      );
    },
    decreaseItemCount: (state, action) => {
      state.ingredients = state.ingredients.map((item) =>
        item._id !== action.payload.id ? item : { ...item, __v: item.__v - 1 }
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.ingredientsRequestStatus = "success";
    });
    builder.addCase(fetchIngredients.rejected, () => ({
      ...initialState,
      ingredientsRequestStatus: "error",
    }));
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsRequestStatus = "request";
    });
  },
});

export default ingredientsSlice.reducer;

export const { increaseItemCount, decreaseItemCount } =
  ingredientsSlice.actions;
