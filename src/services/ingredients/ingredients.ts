import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TBurgerIngredient, TRequestStatus } from "../../utils/normaApi/models";
import { request } from "../../utils/normaApi/norma-api";
import { TIngredientsResponse } from "../../utils/normaApi/models";

export type TIngredientsState = {
  ingredients: TBurgerIngredient[];
  ingredientsRequestStatus: TRequestStatus;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequestStatus: "request",
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => await request<TIngredientsResponse>("/ingredients")
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
