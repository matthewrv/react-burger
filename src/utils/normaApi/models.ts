export type TBurgerIngredient = {
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
};

export type TIngredientType = "bun" | "main" | "sauce";

export const localizedIngredientType: {
  [K in TIngredientType]: string;
} = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы",
};

export type TRequestStatus = "request" | "success" | "error";

export type TIngredientsResponse = {
  data: TBurgerIngredient[];
};

export type TOrderCreateRequest = {
  ingredients: Array<string>;
};

export type TOrderCreateResponse = {
  order: {
    number: number;
  };
};

export type TForgotPasswordRequest = {
  email: string;
};

export type TForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type TResetPasswordRequest = {
  password: string;
  token: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TRegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TGetUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TUpdateUserRequest = {
  name?: string;
  email?: string;
  password?: string;
};

export type TUpdateUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TOrderStatus = "done" | "pending" | "cancelled";

export type TOrderItem = {
  _id: string;
  number: number;
  createdAt: string;
  status: TOrderStatus;
  name: string;
  ingredients: ReadonlyArray<string>;
};

export type TOrdersFeedResponse = {
  success: boolean;
  orders: ReadonlyArray<TOrderItem>;
  total: number;
  totalToday: number;
};

export type TOrderResponse = {
  success: boolean;
  orders: [TOrderItem];
};
