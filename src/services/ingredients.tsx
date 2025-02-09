import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BurgerIngredient } from "./common";
import normaApi from "../utils/normaApi/normaApi";
import { IngredientsResponse } from "../utils/normaApi/models";

export interface IngredientsState {
  ingredients: BurgerIngredient[];
  ingredientsRequestStatus: IngredientsRequestStatus;
}

export type IngredientsRequestStatus = "request" | "error" | "success";

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequestStatus: "success",
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => await normaApi<IngredientsResponse>("/ingredients")
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
