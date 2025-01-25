import { getAccessToken } from "@/utils/storage";
import config from "@config";
import axios, { AxiosError, AxiosResponse } from "axios";

// Create an instance of axios
const request = axios.create({
  baseURL: config.host + "/", // Replace with your API base URL
  timeout: 3000, // The request timeout period
});

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
  (response: AxiosResponse<any, any>) => {
    console.log("type response:", response);
    // Do something about the response data
    return Promise.resolve(response);
  },
  (response: AxiosError<any>) => {
    // Do something about response errors
    return Promise.reject(response);
  },
);

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Generic API request handler */
async function fetchRequest<T>(
  url: string,
  method: Method,
  body?: any,
  options?: API.RequestOptions,
  params?: API.Params,
): Promise<API.Result<T>> {
  return request<API.Result<T>>(url, {
    method,
    ...(params ? { params } : {}),
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
        } else if (isAPIError(respData)) {
          throw new Error(respData.error.message, { cause: respData.error });
        }
      }
      throw respErr;
    });
}

function isAPIError(data: any): data is { error: API.Error } {
  return typeof data === "object" && data !== null && "error" in data && "message" in data.error;
}

export { request, fetchRequest };
