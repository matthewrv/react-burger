import request, { requestWithAuth } from "../utils/normaApi/normaApi";
import { getCookie, setCookie } from "../utils/cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginRequest,
  AuthResponse,
  GetUserResponse,
} from "../utils/normaApi/models";
import { useAppDispatch, useAppSelector } from "./hooks";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { RequestStatus } from "./common";

export interface UserInfo {
  email: string;
  name: string;
}

const getUser = createAsyncThunk("getUser", async () => {
  return await requestWithAuth<GetUserResponse>("/auth/user");
});

export const login = createAsyncThunk(
  "login",
  async (payload: LoginRequest) => {
    return await request<AuthResponse>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response: AuthResponse) => {
      setCookie("token", response.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", response.refreshToken);
      return response;
    });
  }
);

export interface AuthInfo {
  loginStatus?: RequestStatus;
  authentication: "in progress" | "authenticated" | "anonimous";
  user?: {
    name: string;
    email: string;
  };
}

const initialState: AuthInfo = { authentication: "in progress" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload.user;
      return { authentication: "authenticated", user: user };
    });
    builder.addCase(login.rejected, (state, action) => {
      return { authentication: "anonimous" };
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload.user;
      return { authentication: "authenticated", user: user };
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return { authentication: "anonimous" };
    });
  },
});

export default authSlice.reducer;

const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
