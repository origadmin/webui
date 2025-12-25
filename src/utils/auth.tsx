import auth from "@/api/auth";
import { login, logout } from "@/api/system/login";
import { mockSignIn } from "@/mocks/mock-sign-in";
import { SIGN_IN_URL } from "@/types";
import { post } from "@/utils/request";
import { getRefreshToken, removeTokens, setAuth } from "@/utils/storage";
import GlobalConfig from "@config";

export async function refreshToken() {
  const { url } = auth.refreshToken;
  // Assuming the refresh token is stored in localStorage
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.warn("refresh token is empty, perhaps the system is not support refresh token");
    return "";
  }
  if (url === "") {
    return;
  }

  try {
    const response = await post<API.Token>(url, { refresh_token: refreshToken });
    if (response && response.success && response.data) {
      const { access_token } = response.data;
      // Update localStorage with the new tokens
      setAuth(response.data);
      return access_token || "";
    }
  } catch (err) {
    console.error("Refresh Token Error:", err);
  }
  return "";
}

export type SignProps<T extends API.Token> = {
  redirectUrl?: string;
  options?: API.RequestOptions;
  callback?: (token: T | Promise<T>) => void;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
  onFinish?: () => void;
  login?: (params: API.LoginForm, options?: API.RequestOptions) => Promise<API.Result<T>>;
  logout?: (options?: API.RequestOptions) => Promise<API.Result<T>>;
};

export const signOut = async <T extends API.Token>({ logout: _logout = logout, options }: SignProps<T>) => {
  const { pathname } = window.location;
  try {
    await _logout(options);
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get("redirect");
    if (redirect !== null || pathname !== SIGN_IN_URL) {
      window.location.replace(redirect || SIGN_IN_URL);
      return;
    }
  } catch (error) {
    console.error("Error logging out:", error);
    if (pathname !== SIGN_IN_URL) {
      window.location.replace(SIGN_IN_URL);
    }
  } finally {
    removeTokens();
  }
};

export const signIn = async <T extends API.Token>(
  params: API.LoginForm,
  { login: _login = login, options, ...props }: SignProps<T>,
) => {
  if (GlobalConfig.mocks) {
    console.log("mock login:", params);
    const result = mockSignIn(params);
    if (result.success) {
      const token = result.data as T;
      setAuth(token);
      if (props.onSuccess) {
        props.onSuccess(token); // THE CRITICAL FIX: Call onSuccess for mock login
      }
      return; // Stop execution after mock success
    }

    const message = result.error?.message || "unknown error";
    if (props.onError) {
      props.onError(new Error(message));
    }
    return; // Stop execution after mock failure
  }

  try {
    const resp = await _login(params, options);
    if (resp && resp.success && resp.data) {
      const token = resp.data;
      if (token) {
        setAuth(token);
        if (props.onSuccess) {
          props.onSuccess(token);
        }
      } else {
        if (props.onError) {
          props.onError(new Error("Invalid username or password"));
        }
      }
    } else {
      // Handle API call failure (e.g., resp.success is false)
      const message = resp?.message || "Login failed";
      if (props.onError) {
        props.onError(new Error(message));
      }
    }
  } catch (error) {
    console.error("Error logging in:", error);
    if (props.onError) {
      props.onError(error as Error);
    }
  }
};

export const failureRetry = (failureCount: number, error: Error) => {
  console.log("failureCount", failureCount, error);
  const cause = error.cause as API.Error;
  if (cause && cause.code === 500 && failureCount < 2) {
    try {
      const resp = refreshToken();
      console.log("Token refreshed successfully");
      return resp !== undefined;
    } catch (refreshError) {
      console.error("Refresh token failed", refreshError);
      return false;
    }
  }
  return false;
};
