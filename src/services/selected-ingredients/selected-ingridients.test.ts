import { describe, expect, it } from "vitest";
import {
  addIngredient,
  clearIngredients,
  initialState,
  removeIngredient,
  resetBun,
  selectedIngridietsSlice,
  setBun,
  swapElements,
  TSelectedIngredientItem,
} from "./selected-ingredients";

describe("Selected ingridients slice", () => {
  const mockSelectedIngredient: TSelectedIngredientItem = {
    id: "0f44a405-0815-46bd-b5f1-07c8f9c525c8",
    ingredientId: "1baf2cdf-7464-4663-845e-c4640402ebbf",
  };
  const mockIngredientId = "1baf2cdf-7464-4663-845e-c4640402ebbf";

  it("should return initial state", () => {
    expect(selectedIngridietsSlice.reducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should add ingridient", () => {
    const action = addIngredient(mockIngredientId);
    const newState = selectedIngridietsSlice.reducer(undefined, action);
    expect(newState.ingredients.length).toEqual(1);
    expect(newState.ingredients[0]).toEqual(action.payload);
  });

  it("should remove ingridient", () => {
    expect(
      selectedIngridietsSlice.reducer(
        { ...initialState, ingredients: [mockSelectedIngredient] },
        removeIngredient({ id: mockSelectedIngredient.id })
      )
    ).toEqual(initialState);
  });

  it("should reset ingridients", () => {
    expect(
      selectedIngridietsSlice.reducer(
        { ...initialState, ingredients: [mockSelectedIngredient] },
        clearIngredients()
      )
    ).toEqual(initialState);
  });

  it("should set burger bun", () => {
    const action = setBun(mockIngredientId);
    expect(selectedIngridietsSlice.reducer(undefined, action)).toEqual({
      ...initialState,
      bun: action.payload,
    });
  });

  it("should reset burger bun", () => {
    expect(
      selectedIngridietsSlice.reducer(
        {
          ...initialState,
          bun: mockSelectedIngredient,
        },
        resetBun()
      )
    ).toEqual(initialState);
  });

  it("should swap ingredients", () => {
    const anotherMockIngredient: TSelectedIngredientItem = {
      id: "781a3f62-2a07-4654-bb3a-e41d7ce9a9c0",
      ingredientId: "5503f804-7c5a-442d-855f-c744a4b25f16",
    };
    expect(
      selectedIngridietsSlice.reducer(
        {
          ...initialState,
          ingredients: [mockSelectedIngredient, anotherMockIngredient],
        },
        swapElements({ dragIndex: 0, hoverIndex: 1 })
      )
    ).toEqual({
      ...initialState,
      ingredients: [anotherMockIngredient, mockSelectedIngredient],
    });
  });

  it("should preserve ingredients", () => {
    const anotherMockIngredient: TSelectedIngredientItem = {
      id: "781a3f62-2a07-4654-bb3a-e41d7ce9a9c0",
      ingredientId: "5503f804-7c5a-442d-855f-c744a4b25f16",
    };
    expect(
      selectedIngridietsSlice.reducer(
        {
          ...initialState,
          ingredients: [mockSelectedIngredient, anotherMockIngredient],
        },
        swapElements({ dragIndex: 0, hoverIndex: 0 })
      )
    ).toEqual({
      ...initialState,
      ingredients: [mockSelectedIngredient, anotherMockIngredient],
    });
  });
});
