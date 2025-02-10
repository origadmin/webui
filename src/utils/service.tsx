import { HOST, HOST_REQUEST_TIMEOUT } from "@/types";
import { getAccessToken } from "@/utils/storage";
import GlobalConfig from "@config";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Create an instance of axios
const request = axios.create({
  baseURL: GlobalConfig.request.baseURL ? GlobalConfig.request.baseURL : HOST, // Replace with your API base URL
  timeout: GlobalConfig.request.timeout ? GlobalConfig.request.timeout : HOST_REQUEST_TIMEOUT, // The request timeout period
});

// type AxiosRequestInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null, options?: AxiosInterceptorOptions) => number;
// type AxiosResponseInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null) => number;

// Request an interceptor
request.interceptors.request.use(
  (config) => {
    console.log("type config:", config);
    // What to do before sending a request
    // 获取 token，这里假设 token 存储在 localStorage 中
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // What to do about request errors
    return Promise.reject(error);
  },
);

// Respond to the interceptor
request.interceptors.response.use(
  (response) => {
    console.log("type response:", response);
    // Do something about the response data
    return response;
  },
  (response) => {
    // Do something about response errors
    return Promise.reject(response);
  },
);

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function stringifyParam(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return String(value);
}

/** Generic API request handler */
async function fetchRequest<T, TData = unknown>(
  url: string,
  method: Method = "GET",
  options: API.RequestOptions<TData> = {},
): Promise<API.Result<T>> {
  const localVarUrlObj = new URL(url, request.defaults.baseURL);

  const searchParams = new URLSearchParams(localVarUrlObj.search);
  for (const key in options.params) {
    const value = stringifyParam(options.params[key]);
    if (value === undefined) {
      continue;
    }
    searchParams.set(key, value);
  }

  localVarUrlObj.search = searchParams.toString();
  url = localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash;

  const needsSerialization =
    typeof options.body !== "string" ||
    (options.headers && stringifyParam(options.headers["Content-Type"]) === "application/json");
  const config = {
    method,
    headers: options.headers,
    data: needsSerialization ? JSON.stringify(options.body || {}) : options.body,
    ...options.config,
  } as AxiosRequestConfig<TData>;

  return request<API.Result<T>>(url, config)
    .then((resp) => resp.data)
    .catch((respErr: AxiosError<API.Result<T>>) => {
      console.log("request error:", respErr);
      if (respErr && respErr.response && respErr.response.data) {
        const respData = respErr.response.data;
        if (typeof respData === "string") {
          throw new Error(respData);
        } else if (!respData.success) {
          const error = respData.error;
          if (error) {
            throw new Error(error.message, { cause: error });
          }
          throw new Error("Unknown error", { cause: error });
        }
      }
      throw respErr;
    });
}

async function get<T>(url: string, params?: API.Params, options?: API.RequestOptions<any>) {
  options = {
    params,
    ...options,
  };
  return fetchRequest<T, undefined>(url, "GET", options);
}

async function post<T, TData = unknown>(url: string, body?: TData, options?: API.RequestOptions<TData>) {
  options = {
    headers: {
      "Content-Type": "application/json",
    },
    body,
    ...options,
  };
  return fetchRequest<T, TData>(url, "POST", options);
}

async function put<T, TData = unknown>(url: string, body?: TData, options?: API.RequestOptions<TData>) {
  options = {
    headers: {
      "Content-Type": "application/json",
    },
    body,
    ...options,
  };
  return fetchRequest<T, TData>(url, "PUT", options);
}

async function patch<T, TData = unknown>(url: string, body?: TData, options?: API.RequestOptions<TData>) {
  options = {
    headers: {
      "Content-Type": "application/json",
    },
    body,
    ...options,
  };
  return fetchRequest<T, TData>(url, "PATCH", options);
}

async function del<T>(url: string, options?: API.RequestOptions) {
  return fetchRequest<T, unknown>(url, "DELETE", options);
}

export { request, get, post, put, patch, del, fetchRequest };
