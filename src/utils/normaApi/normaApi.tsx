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

export default request;
