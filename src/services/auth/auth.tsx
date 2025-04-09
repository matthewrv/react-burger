import { request } from "../../utils/normaApi/norma-api";
import { Action, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TLoginRequest,
  TAuthResponse,
  TGetUserResponse,
  TLogoutResponse,
  TRegisterRequest,
  TUpdateUserResponse,
  TUpdateUserRequest,
} from "../../utils/normaApi/models";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import {
  getAccessToken,
  getRefreshToken,
  resetAccessToken,
  resetRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/normaApi/auth-tokens";

export type TAuthInfo = {
  isAuthCompleted: boolean;
  user?: {
    email: string;
    name: string;
  };
  errorMsg?: string;
};

export const initialState: TAuthInfo = { isAuthCompleted: false };

// Do not actually use it outside of module - assumed that user is
// requested using AuthContextProvider only. We want to avoid multiple
// getUser requests from different places.
//
// See AuthContextProvider implementation below
export const getUser = createAsyncThunk("getUser", async () => {
  const token = getAccessToken();
  const refreshToken = getRefreshToken();

  if (token || refreshToken) {
    return await request<TGetUserResponse>("/auth/user", undefined, true);
  }
  return Promise.reject(`Пользователь не авторизован`);
});

function setTokens(response: TAuthResponse): TAuthResponse {
  setAccessToken(response.accessToken.split("Bearer ")[1]);
  setRefreshToken(response.refreshToken);
  return response;
}

function resetTokens<T>(response: T): T {
  resetAccessToken();
  resetRefreshToken();
  return response;
}

export const register = createAsyncThunk(
  "auth/register",
  async (payload: TRegisterRequest) => {
    return await request<TAuthResponse>("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => setTokens(response));
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: TLoginRequest) => {
    return await request<TAuthResponse>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(setTokens);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const refreshToken = getRefreshToken();
  return await request<TLogoutResponse>("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(resetTokens);
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (payload: TUpdateUserRequest) => {
    return await request<TUpdateUserResponse>(
      "/auth/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
      true
    );
  }
);

interface PendingAction extends Action {}
function isPendingAction(action: Action): action is PendingAction {
  return action.type.startsWith("auth") && action.type.endsWith("pending");
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (_, action) => ({
        isAuthCompleted: true,
        user: action.payload.user,
      }))
      .addCase(register.fulfilled, (_, action) => ({
        isAuthCompleted: true,
        user: action.payload.user,
      }))
      .addCase(getUser.fulfilled, (_, action) => ({
        isAuthCompleted: true,
        user: action.payload.user,
      }))
      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        isAuthCompleted: true,
        user: action.payload.user,
      }))
      .addCase(login.rejected, (_, action) => ({
        isAuthCompleted: true,
        errorMsg: action.error.message,
      }))
      .addCase(register.rejected, (_, action) => ({
        isAuthCompleted: true,
        errorMsg: action.error.message,
      }))
      .addCase(getUser.rejected, () => {
        // do not save error message on getUser since
        // it is requested on page load and does not
        // intefere with other logic
        return { isAuthCompleted: true };
      })
      .addCase(logout.fulfilled, () => ({
        isAuthCompleted: true,
      }))
      .addCase(logout.rejected, (state, action) => {
        state.isAuthCompleted = true;
        state.errorMsg = action.error.message;
      })
      .addMatcher(isPendingAction, (state) => ({
        isAuthCompleted: false,
        user: state.user, // save user for a while, clear error message
      }));
  },
});

export default authSlice.reducer;

// AuthContext definition and hook
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
