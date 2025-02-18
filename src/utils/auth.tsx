import auth from "@/api/auth";
import { logout, login } from "@/api/system/login";
import { mockLogin } from "@/mocks/mock-login";
import { SIGN_IN_URL } from "@/types";
import { post } from "@/utils/request";
import { getRefreshToken, setAuth } from "@/utils/storage";
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
      // if (access_token) {
      //   localStorage.setItem("access_token", access_token);
      // }
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
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get("redirect");
    // Note: There may be security issues, please note
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
    // Clear user status to prevent errors from causing state confusion
    localStorage.removeItem("access_token");
  }
};

export const signIn = async <T extends API.Token>(
  params: API.LoginForm,
  { login: _login = login, options, ...props }: SignProps<T>,
) => {
  console.log("param value:", params);
  if (GlobalConfig.mocks) {
    console.log("mock login:", params);
    const result = mockLogin(params);
    if (result.success) {
      setAuth(result.data as API.Token);
      return;
    }

    const message = result.error?.message || "unknown error";
    if (props.onError) {
      props.onError(new Error(message));
    }
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
  if (cause.code === 500 && failureCount < 2) {
    try {
      const resp = refreshToken();
      console.log("Token refreshed successfully");
      return resp !== undefined; // Retry the query
    } catch (refreshError) {
      console.error("Refresh token failed", refreshError);
      return false; // Don't retry if refresh failed
    }
  }
  return false; // Don't retry for other errors
};
