import { BurgerIngredient } from "../../services/common";

export interface IngredientsResponse {
  data: BurgerIngredient[];
}

export interface OrderCreateRequest {
  ingredients: Array<string>;
}

export interface OrderCreateResponse {
  order: {
    number: string;
  };
}
