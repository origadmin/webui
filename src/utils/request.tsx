import mocks from "@/mocks";
import { HOST_REQUEST_TIMEOUT, HOST } from "@/types";
import { getAccessToken } from "@/utils/storage";
import GlobalConfig from "@config";
import axios from "axios";
import type { AxiosBasicCredentials, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const request = axios.create({
  baseURL: GlobalConfig.request.baseURL || HOST || window.location.origin,
  timeout: GlobalConfig.request.timeout ? GlobalConfig.request.timeout : HOST_REQUEST_TIMEOUT,
});

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function stringifyParam(value: unknown): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return String(value);
}

const headerAuth = (bearerToken: API.BearerAuth) => {
  if (bearerToken.token) {
    return {
      [bearerToken.headerKey || "Authorization"]: `${bearerToken.tokenType || "Bearer"} ${bearerToken.token}`,
    };
  }
  return {};
};

const fetchBearerToken = (auth: API.AxiosAuthConfig | null) => {
  if (auth === null) return {};
  if (typeof auth === "string") return headerAuth({ token: auth });
  if (typeof auth === "function") {
    const token = auth();
    return typeof token === "string" ? headerAuth({ token }) : headerAuth(token);
  }
  if (typeof auth === "object") return auth as API.BearerAuth;
  return {};
};

const fetchBasicToken = (auth: API.AxiosAuthConfig | null) => {
  if (auth && typeof auth === "object") {
    const basicToken = auth as AxiosBasicCredentials;
    return headerAuth({
      headerKey: "Authorization",
      tokenType: "Basic",
      token: `${basicToken.username}:${basicToken.password}`,
    });
  }
  return {};
};

const fetchHeader = (options: API.RequestOptions) => {
  const { useAuth = "auto", auth = getAccessToken() } = options;
  const { headers = {} } = options;
  if ((useAuth === "auto" || useAuth === "none") && !auth) {
    return headers;
  }
  switch (useAuth) {
    case "auto":
      return { ...headers, ...fetchBearerToken(auth), ...fetchBasicToken(auth) };
    case "bearer":
    case "bearer_token":
      return { ...headers, ...fetchBearerToken(auth) };
    case "basic":
      return { ...headers, ...fetchBasicToken(auth) };
    default:
      return headers;
  }
};

const fillBody = <TData extends object>(body?: TData, options?: API.RequestOptions<TData>) => ({
  headers: { "Content-Type": "application/json", ...options?.headers },
  ...options,
  body,
});

const fillParams = <TData extends object>(params?: API.SearchParams, options?: API.RequestOptions<TData>) => ({
  ...options,
  params,
});

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

  const config = {
    method,
    headers: fetchHeader(options),
    data: options.body,
    ...options.config,
  } as AxiosRequestConfig<TData>;

  return request<T>(finalUrl, config)
    .then((resp: AxiosResponse<T>) => resp.data)
    .catch((err: AxiosError) => {
      if (err?.response?.data) {
        const errorData = err.response.data;
        const kratosError = errorData as API.Error;
        if (kratosError && kratosError.message) {
          throw new Error(kratosError.message, { cause: kratosError });
        }
        if (typeof errorData === "string") {
          throw new Error(errorData);
        }
      }
      throw err;
    });
}

async function get<T extends object>(url: string, params?: API.SearchParams, options?: API.RequestOptions<object>) {
  return fetchRequest<T>(url, "GET", fillParams(params, options));
}

async function del<T extends object>(url: string, params?: API.SearchParams, options?: API.RequestOptions<object>) {
  return fetchRequest<T>(url, "DELETE", fillParams(params, options));
}

async function post<T extends object, TData extends object = object>(
  url: string,
  body?: TData,
  options?: API.RequestOptions<TData>,
) {
  return fetchRequest<T, TData>(url, "POST", fillBody(body, options));
}

async function put<T extends object, TData extends object = object>(
  url: string,
  body?: TData,
  options?: API.RequestOptions<TData>,
) {
  return fetchRequest<T, TData>(url, "PUT", fillBody(body, options));
}

async function patch<T extends object, TData extends object = object>(
  url: string,
  body?: TData,
  options?: API.RequestOptions<TData>,
) {
  return fetchRequest<T, TData>(url, "PATCH", fillBody(body, options));
}

export { request, get, post, put, patch, del, fetchRequest };
