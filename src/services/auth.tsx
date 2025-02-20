import { request } from "../utils/normaApi/normaApi";
import { Action, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LoginRequest,
  AuthResponse,
  GetUserResponse,
  LogoutResponse,
  RegisterRequest,
} from "../utils/normaApi/models";
import { useAppDispatch, useAppSelector } from "./hooks";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import {
  getRefreshToken,
  resetAccessToken,
  resetRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/normaApi/authTokens";

export interface AuthInfo {
  authentication: "in progress" | "authenticated" | "anonymous";
  user?: {
    email: string;
    name: string;
  };
  errorMsg?: string;
}

const initialState: AuthInfo = { authentication: "in progress" };

// Do not export - assumed that user is requested using AuthContextProvider only.
// We want to avoid multiple getUser requests from different places.
//
// See AuthContextProvider implementation below
const getUser = createAsyncThunk("getUser", async () => {
  return await request<GetUserResponse>("/auth/user", undefined, true);
});

function setTokens(response: AuthResponse): AuthResponse {
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
  "register",
  async (payload: RegisterRequest) => {
    return await request<AuthResponse>("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => setTokens(response));
  }
);

export const login = createAsyncThunk(
  "login",
  async (payload: LoginRequest) => {
    return await request<AuthResponse>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(setTokens);
  }
);

export const logout = createAsyncThunk("logout", async () => {
  const refreshToken = getRefreshToken();
  return await request<LogoutResponse>("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(resetTokens);
});

interface PendingAction extends Action {}
function isPendingAction(action: Action): action is PendingAction {
  return action.type.endsWith("pending");
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (_, action) => ({
        authentication: "authenticated",
        user: action.payload.user,
      }))
      .addCase(register.fulfilled, (_, action) => ({
        authentication: "authenticated",
        user: action.payload.user,
      }))
      .addCase(getUser.fulfilled, (_, action) => ({
        authentication: "authenticated",
        user: action.payload.user,
      }))
      .addCase(login.rejected, (_, action) => ({
        authentication: "anonymous",
        errorMsg: action.error.message,
      }))
      .addCase(register.rejected, (_, action) => ({
        authentication: "anonymous",
        errorMsg: action.error.message,
      }))
      .addCase(getUser.rejected, () => {
        // do not save error message on getUser since
        // it is requested on page load and does not
        // intefere with other logic
        return { authentication: "anonymous" };
      })
      .addCase(logout.fulfilled, () => ({ authentication: "anonymous" }))
      .addCase(logout.rejected, (state, action) => {
        state.authentication = "authenticated";
        state.errorMsg = action.error.message;
      })
      .addMatcher(isPendingAction, (state) => ({
        authentication: "in progress",
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
