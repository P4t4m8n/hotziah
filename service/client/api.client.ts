const BASE_URL = "//localhost:3000/api/";

interface IApiClientService {
  get<T>(endpoint: string, data?: unknown): Promise<T>;
  post<T>(endpoint: string, data?: unknown): Promise<T>;
  put<T>(endpoint: string, data?: unknown): Promise<T>;
  delete<T>(endpoint: string, data?: unknown): Promise<T>;
}

export const apiClientService: IApiClientService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

const ajax = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: unknown = null
): Promise<T> => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const options: RequestInit = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    } else if (method === "GET" && data) {
      const queryParams = new URLSearchParams(data as Record<string, string>);
      endpoint += `?${queryParams.toString()}`;
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      if (res.status === 401) {
        sessionStorage.clear();
        throw new Error("Unauthorized");
      }

      if (res.status === 409) {
        const errorBody = await res.json();
        throw new Error(errorBody.message, { cause: 409 });
      }

      throw new Error(res.statusText);
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error("HTTP Service Error:", err);
    throw err;
  }
};
