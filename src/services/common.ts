export interface IBurgerIngredient {
  _id: string;
  name: string;
  type: TIngredientType;
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

export type TIngredientType = "bun" | "main" | "sauce";

export const localizedIngredientType: {
  [K in TIngredientType]: string;
} = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

export type TRequestStatus = "request" | "success" | "error";
