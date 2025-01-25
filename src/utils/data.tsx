export type IngridientType = "bun" | "main" | "sauce";
export const localizedIngridientType: { [K in IngridientType]: string } = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

export interface BurgerIngridient {
  _id: string;
  name: string;
  type: IngridientType;
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
