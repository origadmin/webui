import mocks from "@/mocks";
import { API_REFRESH_TOKEN_URL, HOST, HOST_REQUEST_TIMEOUT, SIGN_IN_URL, SIGN_UP_URL } from "@/types";
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
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: unknown) => void }[] = [];

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
  const currentToken = getAccessToken();
  // Check if we still have a valid token in storage.
  // This prevents clearing a newly set token from stale requests.
  if (currentToken) {
    console.warn("[handleAuthError] Skipping storage clear - token exists. This might be a stale request.");
    return;
  }

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

    // Construct the full URLs for public endpoints
    const urlPrefix = GlobalConfig.api.urlPrefix || "";
    const refreshTokenUrl = `${urlPrefix}${API_REFRESH_TOKEN_URL}`;
    const loginUrl = `${urlPrefix}${SIGN_IN_URL}`;
    const registerUrl = `${urlPrefix}${SIGN_UP_URL}`;

    // Define public URLs that should not trigger the refresh logic
    const publicUrls = [refreshTokenUrl, loginUrl, registerUrl];

    // If the error is not a 401, or it's a 401 from a public URL, reject immediately.
    if (error.response?.status !== 401 || publicUrls.includes(originalRequest.url || "")) {
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

  // Clean and append parameters
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      // Skip null, undefined, or empty string values
      if (value !== null && value !== undefined && value !== "") {
        // If the value is an array, append each element separately
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, stringifyParam(v)!));
        } else {
          const paramValue = stringifyParam(value);
          if (paramValue !== undefined) {
            searchParams.set(key, paramValue);
          }
        }
      }
    });
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
      const errorData = err?.response?.data;

      // Case 1: Kratos error (API.Error)
      if (
        typeof errorData === "object" &&
        errorData !== null &&
        "message" in errorData &&
        typeof (errorData as API.Error).message === "string"
      ) {
        throw new Error((errorData as API.Error).message, { cause: errorData as API.Error });
      }

      // Case 2: String error
      if (typeof errorData === "string") {
        throw new Error(errorData);
      }

      // Case 3: Other Axios errors or network errors
      if (err.message) {
        throw new Error(err.message, { cause: err });
      }

      // Fallback: Unknown error
      throw new Error("未知错误", { cause: err });
    });
}

const fillBody = <TData extends object>(body?: TData, options?: Omit<API.RequestOptions, "body">) => ({
  headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
  ...options,
  body,
});

const fillParams = (params?: API.SP, options?: Omit<API.RequestOptions, "body">) => ({
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
