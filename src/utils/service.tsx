import { HOST } from "@/types";
import { getAccessToken } from "@/utils/storage";
import axios from "axios";

// Create an instance of axios
const request = axios.create({
  baseURL: HOST + "/", // Replace with your API base URL
  timeout: 1000, // The request timeout period
});

// Request an interceptor
request.interceptors.request.use(
  (config) => {
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
  (response: API.Result<any>) => {
    // Do something about the response data
    return response.data;
  },
  (response: API.Result<any>) => {
    // Do something about response errors
    return Promise.reject(response.error);
  },
);

/** Generic API request handler */
async function fetchRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: any,
  options?: API.RequestOptions,
  params?: API.Params,
) {
  return request<API.Result<T>>(url, {
    method,
    ...(params ? { params } : {}),
    ...(body ? { data: body } : {}),
    ...(options || {}),
  });
}

export { request, fetchRequest };
