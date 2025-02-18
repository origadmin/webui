import mocks from "@/mocks";
import { HOST_REQUEST_TIMEOUT, HOST } from "@/types";
import { getAccessToken } from "@/utils/storage";
import GlobalConfig from "@config";
import axios, { AxiosBasicCredentials, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Create an instance of axios
const request = axios.create({
  baseURL: GlobalConfig.request.baseURL || HOST || window.location.origin, // Replace with your API base URL
  timeout: GlobalConfig.request.timeout ? GlobalConfig.request.timeout : HOST_REQUEST_TIMEOUT, // The request timeout period
});

// type AxiosRequestInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null, options?: AxiosInterceptorOptions) => number;
// type AxiosResponseInterceptorUse<T> = (onFulfilled?: ((value: T) => T | Promise<T>) | null, onRejected?: ((error: any) => any) | null) => number;

// Request an interceptor
request.interceptors.request.use(
  (config) => {
    console.log("type config:", config);
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

const convertError = <T,>(error: AxiosError<API.Result<T>>) => {
  if (error && error.response && error.response.data) {
    const respData = error.response.data;
    if (typeof respData === "string") {
      return new Error(respData);
    }
    const apiErr = respData as API.Result<T>;
    if (!apiErr.success) {
      const error = apiErr.error;
      if (error) {
        return new Error(error.message, { cause: error });
      }
      return new Error("Unknown error", { cause: error });
    }
  }
  return error;
};

const headerAuth = (bearerToken: API.BearerAuth) => {
  if (bearerToken.token) {
    return {
      [bearerToken.headerKey || "Authorization"]: `${bearerToken.tokenType || "Bearer"} ${bearerToken.token}`,
    };
  }
  return {};
};

const fetchBearerToken = (auth: API.AxiosAuthConfig | null) => {
  let token: API.BearerAuth;
  if (auth === null) {
    return {};
  }

  if (typeof auth === "string") {
    token = { headerKey: "Authorization", tokenType: "Bearer", token: auth };
  } else if (typeof auth === "object") {
    token = auth as API.BearerAuth;
  } else if (typeof auth === "function") {
    const _bearerToken = auth();
    if (typeof _bearerToken === "string") {
      token = { headerKey: "Authorization", tokenType: "Bearer", token: _bearerToken };
    } else {
      token = _bearerToken;
    }
  } else {
    return {};
  }

  return headerAuth(token);
};

const fetchBasicToken = (auth: API.AxiosAuthConfig | null) => {
  if (typeof auth === "object") {
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
  if ((useAuth === "auto" || useAuth === "none") && auth === undefined) {
    return headers;
  }
  switch (useAuth) {
    case "auto": {
      const bearerToken = fetchBearerToken(auth);
      const basicToken = fetchBasicToken(auth);
      return {
        ...headers,
        ...bearerToken,
        ...basicToken,
      };
    }
    case "bearer_token": {
      const requestToken = fetchBearerToken(auth);
      return {
        ...headers,
        ...requestToken,
      };
    }
    case "bearer": {
      return {
        ...headers,
        ...fetchBearerToken(auth),
      };
    }
    case "basic": {
      return {
        ...headers,
        ...fetchBasicToken(auth),
      };
    }
  }

  // todo: add middleware
  GlobalConfig.api.middlewares.map(({ beforeRequest }) => {
    return typeof beforeRequest === "function" ? beforeRequest(options) : undefined;
  });
  return headers;
};

const fillBody = <TData,>(body?: TData, options?: API.RequestOptions<TData>) => {
  if (options || body) {
    options = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body: body,
    };
  } else {
    options = {
      headers: {
        "Content-Type": "application/json",
      },
      ...(options || {}),
    };
  }
  return options;
};

const fillParams = <TData,>(params?: API.SearchParams, options?: API.RequestOptions<TData>) => {
  if (options || params) {
    options = {
      ...options,
      params,
    };
  } else {
    /* empty */
  }
  return options;
};

/** Generic API request handler */
async function fetchRequest<T, TData = unknown>(
  url: string,
  method: Method = "GET",
  options: API.RequestOptions<TData> = {},
): Promise<API.Result<T>> {
  console.log("fetchRequest:", url, method, "options:", options);
  console.log("request url", request.defaults.baseURL);

  if (GlobalConfig.mocks) {
    console.log("mock request:", url, method, options);
    return new Promise<API.Result<T>>((resolve, reject) => {
      setTimeout(() => {
        const data = mocks<T>(url, options.params);
        console.log("mock data:", data);
        if (data.success) {
          resolve(data);
          return;
        }
        reject(data);
      }, 1000);
    });
  }
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
  url = GlobalConfig.api.urlPrefix ? GlobalConfig.api.urlPrefix + url : url;

  const needsSerialization =
    typeof options.body !== "string" ||
    (options.headers && stringifyParam(options.headers["Content-Type"]) === "application/json");

  options.headers = fetchHeader(options);

  const config = {
    method,
    headers: options.headers,
    data: needsSerialization ? JSON.stringify(options.body || {}) : options.body,
    ...options.config,
  } as AxiosRequestConfig<TData>;
  return request<API.Result<T>>(url, config)
    .then((resp: AxiosResponse<API.Result<T>>) => resp.data)
    .catch((respErr: AxiosError<API.Result<T>>) => {
      console.log("request error:", respErr);
      throw convertError(respErr);
    });
}

async function get<T>(url: string, _paramsOrOptions?: API.SearchParams, options?: API.RequestOptions) {
  options = fillParams(_paramsOrOptions, options);
  return fetchRequest<T>(url, "GET", options);
}

async function post<T, TData = unknown>(url: string, bodyOrOptions?: TData, options?: API.RequestOptions<TData>) {
  options = fillBody(bodyOrOptions, options);
  return fetchRequest<T, TData>(url, "POST", options);
}

async function put<T, TData = unknown>(url: string, bodyOrOptions?: TData, options?: API.RequestOptions<TData>) {
  options = fillBody(bodyOrOptions, options);
  return fetchRequest<T, TData>(url, "PUT", options);
}

async function patch<T, TData = unknown>(url: string, bodyOrOptions?: TData, options?: API.RequestOptions<TData>) {
  options = fillBody(bodyOrOptions, options);
  return fetchRequest<T, TData>(url, "PATCH", options);
}

async function del<T>(
  url: string,
  paramsOrOptions?: API.SearchParams | API.RequestOptions,
  options?: API.RequestOptions,
) {
  options = fillParams(paramsOrOptions, options);
  return fetchRequest<T>(url, "DELETE", options);
}

export { request, get, post, put, patch, del, fetchRequest };
