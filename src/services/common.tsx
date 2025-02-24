export interface BurgerIngredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type IngredientType = "bun" | "main" | "sauce";

export const localizedIngredientType: {
  [K in IngredientType]: string;
} = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

export type RequestStatus = "request" | "success" | "error";
