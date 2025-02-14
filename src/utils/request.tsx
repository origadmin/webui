import mocks from "@/mocks";
import { HOST_REQUEST_TIMEOUT, HOST } from "@/types";
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
    // What to do before sending a request
    // 获取 token，这里假设 token 存储在 localStorage 中
    // const token = getAccessToken();
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
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

const resultBearer = (bearerToken: API.BearerAuth) => {
  if (bearerToken.token) {
    return {
      [bearerToken.headerKey || "Authorization"]: `${bearerToken.tokenType || "Bearer"} ${bearerToken.token}`,
    };
  }
  return {};
};

const tryBearer = (auth: API.AxiosAuthConfig) => {
  if (typeof auth === "string") {
    return {
      Authorization: `${auth}`,
    };
  }

  let bearerToken = {} as API.BearerAuth | undefined;
  if (typeof auth === "object") {
    bearerToken = auth as API.BearerAuth;
    return resultBearer(bearerToken);
  }
  if (typeof auth === "function") {
    const _bearerToken = auth();
    if (typeof _bearerToken === "string") {
      return {
        Authorization: `${bearerToken}`,
      };
    }
    bearerToken = _bearerToken as API.BearerAuth;
    return resultBearer(bearerToken);
  }
  return {};
};

const tryBasic = (auth: API.AxiosAuthConfig) => {
  if (typeof auth === "string") {
    return {
      Authorization: `Basic ${auth}`,
    };
  }
  if (typeof auth === "object") {
    const basicToken = auth as AxiosBasicCredentials;
    return {
      Authorization: `Basic ${basicToken.username}:${basicToken.password}`,
    };
  }
  return {};
};
const getAuthorization = (options: API.RequestOptions) => {
  const { useAuth = "auto", auth } = options;
  const { headers = {} } = options;
  if ((useAuth === "auto" || useAuth === "none") && auth === undefined) {
    return headers;
  }
  switch (useAuth) {
    case "auto": {
      const bearerToken = tryBearer(auth || {});
      const basicToken = tryBasic(auth || {});
      return {
        ...headers,
        ...bearerToken,
        ...basicToken,
      };
    }
    case "bearer_token": {
      const { Authorization: token } = tryBearer(auth || {});
      return {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    case "bearer": {
      return {
        ...headers,
        ...tryBearer(auth || {}),
      };
    }
    case "basic": {
      return {
        ...headers,
        ...tryBasic(auth || {}),
      };
    }
  }
  return headers;
};

const fillBody = <TData,>(bodyOrOptions?: TData | API.RequestOptions<TData>, options?: API.RequestOptions<TData>) => {
  if (options) {
    options = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body: bodyOrOptions as TData,
    };
  } else if (bodyOrOptions) {
    options = {
      headers: {
        "Content-Type": "application/json",
      },
      ...(bodyOrOptions as API.RequestOptions<TData>),
    };
  } else {
    options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return options;
};

const fillParams = <TData,>(
  paramOrOptions?: API.SearchParams | API.RequestOptions<TData>,
  options?: API.RequestOptions<TData>,
) => {
  if (options) {
    options = {
      ...options,
      params: paramOrOptions as API.SearchParams,
    };
  } else if (paramOrOptions) {
    options = {
      ...(paramOrOptions as API.RequestOptions<TData>),
    };
  } else {
    options = {};
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

  options.headers = getAuthorization(options);

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

async function get<T>(url: string, _paramsOrOptions?: API.SearchParams | API.RequestOptions, options?: API.RequestOptions) {
  options = fillParams(_paramsOrOptions, options);
  return fetchRequest<T>(url, "GET", options);
}

async function post<T, TData = unknown>(
  url: string,
  bodyOrOptions?: TData | API.RequestOptions<TData>,
  options?: API.RequestOptions<TData>,
) {
  options = fillBody(bodyOrOptions, options);
  return fetchRequest<T, TData>(url, "POST", options);
}

async function put<T, TData = unknown>(
  url: string,
  bodyOrOptions?: TData | API.RequestOptions<TData>,
  options?: API.RequestOptions<TData>,
) {
  options = fillBody(bodyOrOptions, options);
  return fetchRequest<T, TData>(url, "PUT", options);
}

async function patch<T, TData = unknown>(
  url: string,
  bodyOrOptions?: TData | API.RequestOptions<TData>,
  options?: API.RequestOptions<TData>,
) {
  options = fillBody(bodyOrOptions, options);
  return fetchRequest<T, TData>(url, "PATCH", options);
}

async function del<T>(url: string, paramsOrOptions?: API.SearchParams | API.RequestOptions, options?: API.RequestOptions) {
  options = fillParams(paramsOrOptions, options);
  return fetchRequest<T>(url, "DELETE", options);
}

export { request, get, post, put, patch, del, fetchRequest };
