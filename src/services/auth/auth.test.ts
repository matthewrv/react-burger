import { describe, expect, it } from "vitest";
import {
  authSlice,
  getUser,
  initialState,
  login,
  logout,
  register,
  updateUser,
} from "./auth";

describe("Authentication reducer", () => {
  const mockUser = {
    email: "test@example.com",
    name: "Ada",
  };

  it("Should return initial state", () => {
    expect(authSlice.reducer(undefined, { type: "" })).toBe(initialState);
  });

  it("Should return state with user after login", () => {
    expect(
      authSlice.reducer(undefined, {
        type: login.fulfilled.type,
        payload: { user: mockUser },
      })
    ).toEqual({ ...initialState, isAuthCompleted: true, user: mockUser });
  });

  it("Should return state with user after register", () => {
    expect(
      authSlice.reducer(undefined, {
        type: register.fulfilled.type,
        payload: { user: mockUser },
      })
    ).toEqual({ ...initialState, isAuthCompleted: true, user: mockUser });
  });

  it("Should return state with user after getUser", () => {
    expect(
      authSlice.reducer(undefined, {
        type: getUser.fulfilled.type,
        payload: { user: mockUser },
      })
    ).toEqual({ ...initialState, isAuthCompleted: true, user: mockUser });
  });

  it("Should update user after updateUser", () => {
    const newUser = { name: "Fortran", email: "test2@example.com" };

    expect(
      authSlice.reducer(
        { ...initialState, user: mockUser },
        {
          type: updateUser.fulfilled.type,
          payload: { user: newUser },
        }
      )
    ).toEqual({ ...initialState, isAuthCompleted: true, user: newUser });
  });

  it("Should contain error message on login rejected", () => {
    expect(
      authSlice.reducer(undefined, {
        type: login.rejected.type,
        error: { message: "Login failed" },
      })
    ).toEqual({
      ...initialState,
      isAuthCompleted: true,
      errorMsg: "Login failed",
    });
  });

  it("Should contain error message on register rejected", () => {
    expect(
      authSlice.reducer(undefined, {
        type: register.rejected.type,
        error: { message: "Register failed" },
      })
    ).toEqual({
      ...initialState,
      isAuthCompleted: true,
      errorMsg: "Register failed",
    });
  });

  it("Should silently end auth on getUser rejected", () => {
    expect(
      authSlice.reducer(undefined, {
        type: getUser.rejected.type,
        error: { message: "Get user failed" },
      })
    ).toEqual({
      ...initialState,
      isAuthCompleted: true,
    });
  });

  it("Should reset user on logout", () => {
    expect(
      authSlice.reducer(
        { ...initialState, user: mockUser },
        { type: logout.fulfilled.type }
      )
    ).toEqual({ isAuthCompleted: true });
  });

  it("Should save current user on logout fail", () => {
    expect(
      authSlice.reducer(
        { ...initialState, user: mockUser },
        { type: logout.rejected.type, error: { message: "Logout failed" } }
      )
    ).toEqual({
      user: mockUser,
      ...initialState,
      errorMsg: "Logout failed",
      isAuthCompleted: true,
    });
  });

  it("Should be in_progress on login pending", () => {
    expect(
      authSlice.reducer(initialState, { type: login.pending.type })
    ).toEqual({ ...initialState, isAuthCompleted: false });
  });

  it("Should be in_progress on register pending", () => {
    expect(
      authSlice.reducer(initialState, { type: register.pending.type })
    ).toEqual({ ...initialState, isAuthCompleted: false });
  });

  it("Should be in_progress on getUser pending", () => {
    expect(
      authSlice.reducer(initialState, { type: getUser.pending.type })
    ).toEqual({ ...initialState, isAuthCompleted: false });
  });

  it("Should be in_progress on updateUser pending", () => {
    expect(
      authSlice.reducer(initialState, { type: updateUser.pending.type })
    ).toEqual({ ...initialState, isAuthCompleted: false });
  });

  it("Should be in_progress on logout pending", () => {
    expect(
      authSlice.reducer(initialState, { type: logout.pending.type })
    ).toEqual({ ...initialState, isAuthCompleted: false });
  });
});
