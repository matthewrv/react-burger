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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface GetUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}
