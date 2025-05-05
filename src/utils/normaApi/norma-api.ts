import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./auth-tokens";
import { TErrorDetail, TRefreshTokenResponse } from "./models";

const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

export function request<T>(
  ...args: Parameters<typeof withCheckResponse>
): Promise<T> {
  return withCheckResponse<T>(...args);
}

function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  if (Math.floor(response.status / 100) === 4) {
    return response.json().then((body) => {
      const msg =
        typeof body.detail === "string"
          ? body.detail
          : Array.isArray(body.detail)
          ? body.detail.map((i: TErrorDetail) => i.msg).join()
          : undefined;
      const user_msg = msg ? `Ошибка: ${msg}` : "Ошибка сервера";
      return Promise.reject<T>(user_msg);
    });
  }
  return Promise.reject<T>(`Ошибка ${response.status}`);
}

function withCheckResponse<T>(...args: Parameters<typeof withBaseUrl>) {
  return withBaseUrl(...args).then(checkResponse<T>);
}

function withBaseUrl(endpoint: string, options?: RequestInit, auth?: boolean) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  auth = auth || false;
  if (auth) {
    return withRefresh(url, options);
  }
  return fetch(url, options);
}

function withRefresh(...args: Parameters<typeof withToken>) {
  return withToken(...args).then((response) => {
    if (!response.ok && response.status === 403) {
      return refreshToken().then(() => withToken(...args));
    }
    return response;
  });
}

function withToken(endpoint: URL, options?: RequestInit) {
  const token = getAccessToken();
  const newOptions = {
    ...options,
    headers: { ...options?.headers, Authorization: `Bearer ${token}` },
  };
  return fetch(endpoint, newOptions);
}

export async function refreshToken(): Promise<TRefreshTokenResponse> {
  const token = getRefreshToken();
  return request<TRefreshTokenResponse>("/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token }),
  }).then((response) => {
    if (response.success) {
      setAccessToken(response.accessToken.split("Bearer ")[1]);
      setRefreshToken(response.refreshToken);
    }
    return response;
  });
}
