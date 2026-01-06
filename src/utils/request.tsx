import mocks from "@/mocks";
import { API_REFRESH_TOKEN_URL, HOST, HOST_REQUEST_TIMEOUT, SIGN_IN_URL } from "@/types";
import { clearStorage, getRefreshToken, setAuth } from "@/utils/storage";
import { getAccessToken } from "@/utils/storage";
import GlobalConfig from "@config";
import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

// --- Helper Functions ---

function stringifyParam(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return String(value);
}

// --- Axios Instance Creation ---

const request = axios.create({
  baseURL: GlobalConfig.request.baseURL || HOST || window.location.origin,
  timeout: GlobalConfig.request.timeout || HOST_REQUEST_TIMEOUT,
});

// --- Request Interceptor ---

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// --- Response Interceptor with Token Refresh Logic ---

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleAuthError = () => {
  clearStorage();
  // Redirect to login page. Using window.location for simplicity.
  // In a real app, you might use a history object from a routing library.
  window.location.href = SIGN_IN_URL;
};

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Construct the refresh token URL by respecting the global prefix.
    const refreshTokenUrl = `${GlobalConfig.api.urlPrefix || ""}${API_REFRESH_TOKEN_URL}`;

    // If the error is not a 401, or it's a 401 from the refresh token endpoint itself, reject immediately.
    if (error.response?.status !== 401 || originalRequest.url === refreshTokenUrl) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return request(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      isRefreshing = false;
      handleAuthError();
      return Promise.reject(error);
    }

    try {
      // Use a raw axios call but ensure the URL is correctly constructed.
      const { data: newToken } = await axios.post<API.Token>(`${request.defaults.baseURL}${refreshTokenUrl}`, {
        refresh_token: refreshToken,
      });

      setAuth(newToken);
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken.access_token}`;
      }
      processQueue(null, newToken.access_token);
      return request(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      handleAuthError();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// --- API Method Implementations ---

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function fetchRequest<T extends object, TData extends object = object>(
  url: string,
  method: Method = "GET",
  options: API.RequestOptions<TData> = {},
): Promise<T> {
  if (GlobalConfig.mocks) {
    const mockResponse = mocks<T>(url, options.params);
    if (mockResponse.success && mockResponse.data) {
      return Promise.resolve(mockResponse.data as T);
    }
    return Promise.reject(mockResponse);
  }

  const localVarUrlObj = new URL(url, request.defaults.baseURL);
  const searchParams = new URLSearchParams(localVarUrlObj.search);

  for (const key in options.params) {
    const value = stringifyParam(options.params[key]);
    if (value !== undefined) {
      searchParams.set(key, value);
    }
  }

  localVarUrlObj.search = searchParams.toString();

  const finalUrl = (GlobalConfig.api.urlPrefix || "") + localVarUrlObj.pathname + localVarUrlObj.search;

  const config: AxiosRequestConfig<TData> = {
    method,
    data: options.body,
    ...(options.config as AxiosRequestConfig<TData>),
  };

  return request<T>(finalUrl, config)
    .then((resp: AxiosResponse<T>) => resp.data)
    .catch((err: AxiosError) => {
      if (err?.response?.data) {
        const errorData = err.response.data;
        // Type guard to check if errorData is an object with a message property
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "message" in errorData &&
          typeof errorData.message === "string"
        ) {
          throw new Error(errorData.message, { cause: errorData });
        }
        if (typeof errorData === "string") {
          throw new Error(errorData);
        }
      }
      throw err;
    });
}

const fillBody = <TData extends object>(body?: TData, options?: Omit<API.RequestOptions, "body">) => ({
  headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
  ...options,
  body,
});

const fillParams = (params?: API.SearchParams, options?: Omit<API.RequestOptions, "body">) => ({
  ...options,
  params,
});

async function get<T extends object>(
  url: string,
  params?: API.SearchParams,
  options?: Omit<API.RequestOptions, "body">,
) {
  return fetchRequest<T>(url, "GET", fillParams(params, options));
}

async function del<T extends object>(
  url: string,
  params?: API.SearchParams,
  options?: Omit<API.RequestOptions, "body">,
) {
  return fetchRequest<T>(url, "DELETE", fillParams(params, options));
}

async function post<T extends object, TData extends object = object>(
  url: string,
  body?: TData,
  options?: Omit<API.RequestOptions, "body">,
) {
  return fetchRequest<T, TData>(url, "POST", fillBody(body, options));
}

async function put<T extends object, TData extends object = object>(
  url: string,
  body?: TData,
  options?: Omit<API.RequestOptions, "body">,
) {
  return fetchRequest<T, TData>(url, "PUT", fillBody(body, options));
}

async function patch<T extends object, TData extends object = object>(
  url: string,
  body?: TData,
  options?: Omit<API.RequestOptions, "body">,
) {
  return fetchRequest<T, TData>(url, "PATCH", fillBody(body, options));
}

export { request, get, post, put, patch, del, fetchRequest };
