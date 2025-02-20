import { getCookie, setCookie } from "../cookie";

export function getAccessToken(): string | undefined {
  return getCookie("token");
}
export function setAccessToken(value: string) {
  setCookie("token", value);
}
export function resetAccessToken() {
  setCookie("token", "");
}

export function getRefreshToken(): string | undefined {
  return getCookie("refreshToken");
}
export function setRefreshToken(value: string) {
  setCookie("refreshToken", value);
}
export function resetRefreshToken() {
  setCookie("refreshToken", "");
}
