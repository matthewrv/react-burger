import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredient, TRequestStatus } from "./common";
import { request } from "../utils/normaApi/norma-api";
import { IngredientsResponse } from "../utils/normaApi/models";

export interface IIngredientsState {
  ingredients: IBurgerIngredient[];
  ingredientsRequestStatus: TRequestStatus;
}

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsRequestStatus: "request",
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => await request<IngredientsResponse>("/ingredients")
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
    resetAllItemsCount: (state) => {
      state.ingredients = state.ingredients.map((item) => ({
        ...item,
        __v: 0,
      }));
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

export const { increaseItemCount, decreaseItemCount, resetAllItemsCount } =
  ingredientsSlice.actions;
