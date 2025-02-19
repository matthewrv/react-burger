import { getCookie, setCookie } from "../cookie";
import { RefreshTokenResponse } from "./models";

export const BASE_URL = "https://norma.nomoreparties.space/api";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return await fetch(`${BASE_URL}${endpoint}`, options).then(checkRequest<T>);
}

function checkRequest<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject<T>(`Ошибка ${response.status}`);
}

export async function requestWithAuth<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return await fetchWithToken(endpoint, options)
    .then((response) => {
      if (!response.ok && response.status === 403) {
        return refreshToken().then(() => fetchWithToken(endpoint, options));
      }
      return response;
    })
    .then(checkRequest<T>);
}

async function refreshToken(): Promise<RefreshTokenResponse> {
  const token = getCookie("refreshToken");
  return await request<RefreshTokenResponse>("/auth/token", {
    method: "POST",
    body: JSON.stringify({ token: token }),
  }).then((response) => {
    if (response.success) {
      setCookie("token", response.token);
      setCookie("refreshToken", response.refreshToken);
    }
    return response;
  });
}

async function fetchWithToken(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  const token = getCookie("token");
  const newOptions = {
    ...options,
    headers: { ...options?.headers, Authorization: `Bearer ${token}` },
  };
  return await fetch(`${BASE_URL}${endpoint}`, newOptions);
}

export default request;
