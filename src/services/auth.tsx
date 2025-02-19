import { request } from "../utils/normaApi/normaApi";
import { getCookie, setCookie } from "../utils/cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginRequest,
  AuthResponse,
  GetUserResponse,
  LogoutResponse,
} from "../utils/normaApi/models";
import { useAppDispatch, useAppSelector } from "./hooks";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { RequestStatus } from "./common";

export interface UserInfo {
  email: string;
  name: string;
}

// do not export - assumed that user is requested using AuthContextProvider only
// to avoid multiple getUser requests
const getUser = createAsyncThunk("getUser", async () => {
  return await request<GetUserResponse>("/auth/user", undefined, true);
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

export const logout = createAsyncThunk("logout", async () => {
  const refreshToken = getCookie("refreshToken");
  return await request<LogoutResponse>("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then((response) => {
    setCookie("token", "");
    setCookie("refreshToken", "");
    return response;
  });
});

export interface AuthInfo {
  authentication: "in progress" | "authenticated" | "anonymous";
  user?: UserInfo;
  errorMsg?: string;
}

const initialState: AuthInfo = { authentication: "in progress" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (_, action) => ({
      authentication: "in progress",
    }));
    builder.addCase(login.fulfilled, (_, action) => ({
      authentication: "authenticated",
      user: action.payload.user,
    }));
    builder.addCase(login.rejected, (state, action) => ({
      authentication: "anonymous",
      errorMsg: action.error.message,
    }));

    builder.addCase(getUser.fulfilled, (_, action) => {
      const user = action.payload.user;
      return { authentication: "authenticated", user: user };
    });
    builder.addCase(getUser.rejected, () => {
      return { authentication: "anonymous" };
    });

    builder.addCase(logout.pending, (state) => {
      state.authentication = "in progress";
    });
    builder.addCase(logout.fulfilled, () => ({ authentication: "anonymous" }));
    builder.addCase(logout.rejected, (state, action) => {
      state.authentication = "authenticated";
      state.errorMsg = action.error.message;
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
