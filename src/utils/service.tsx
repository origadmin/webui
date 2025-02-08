import { HOST } from "@/types";
import { getAccessToken } from "@/utils/storage";
import config from "@config";
import axios, { AxiosError } from "axios";

// Create an instance of axios
const request = axios.create({
  baseURL: config.host ? config.host : HOST, // Replace with your API base URL
  timeout: 3000, // The request timeout period
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

/** Generic API request handler */
async function fetchRequest<T, TData = unknown>(
  url: string,
  method: Method = "GET",
  body?: TData,
  options?: API.RequestOptions,
  params?: API.Params, // url parameters
): Promise<API.Result<T>> {
  const localVarUrlObj = new URL(url, request.defaults.baseURL);

  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  return request<API.Result<T>>(url, {
    method,
    ...(body ? { data: body } : {}),
    ...(options || {}),
  })
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

export { request, fetchRequest };
