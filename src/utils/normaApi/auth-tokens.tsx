export function getAccessToken(): string | null {
  return localStorage.getItem("token");
}
export function setAccessToken(value: string) {
  localStorage.setItem("token", value);
}
export function resetAccessToken() {
  localStorage.removeItem("token");
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refreshToken");
}
export function setRefreshToken(value: string) {
  localStorage.setItem("refreshToken", value);
}
export function resetRefreshToken() {
  localStorage.removeItem("refreshToken");
}
