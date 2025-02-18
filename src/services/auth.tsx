import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
} from "../utils/normaApi/models";
import request from "../utils/normaApi/normaApi";

export const login = createAsyncThunk("login", (payload: LoginRequest) => {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
});

export const register = createAsyncThunk(
  "register",
  (payload: RegisterRequest) => {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
);

export interface UserInfo {
  name: string;
  email: string;
}

export interface UserState {
  status:
    | ""
    | "login/pending"
    | "login/failed"
    | "register/pending"
    | "register/failed";
  current?: UserInfo;
  accessToken?: string;
}

const initialState: UserState = { status: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, () => ({ status: "login/pending" }));
    builder.addCase(login.rejected, () => ({ status: "login/failed" }));

    builder.addCase(login.fulfilled, (_, action) => {
      if (action.payload.success) {
        // TODO: save refresh token
        const { user, accessToken } = action.payload;
        return { status: "", current: user, accessToken: accessToken };
      }
      return { status: "login/failed" };
    });

    builder.addCase(register.pending, () => ({ status: "register/pending" }));
    builder.addCase(register.rejected, () => ({ status: "register/failed" }));

    builder.addCase(register.fulfilled, (_, action) => {
      if (action.payload.success) {
        const { user, accessToken } = action.payload;
        // TODO: save refresh token
        return { status: "", current: user, accessToken: accessToken };
      }
      return { status: "register/failed" };
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
