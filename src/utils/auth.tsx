import { mockToken } from "@/mocks/mock-sidebar";
import { logout, login } from "@/services/system/login";
import { SIGN_IN_URL } from "@/types";
import { fetchRequest, Method } from "@/utils/service";
import { getRefreshToken } from "@/utils/storage";
import config from "@config";
import { AxiosResponse } from "axios";

export async function refreshToken() {
  const { url, method } = config.auth.refreshToken;
  // Assuming the refresh token is stored in localStorage
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  if (url === "") {
    return;
  }

  try {
    const response = await fetchRequest<API.Token>(
      config.host + url,
      method === "" ? "GET" : (method as Method),
      JSON.stringify({ refresh_token: refreshToken }),
      undefined,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response && response.success && response.data) {
      const { access_token } = response.data;
      // Update localStorage with the new tokens
      if (access_token) {
        localStorage.setItem("access_token", access_token);
      }
      // if (data && "refresh_token" in data) {
      //   localStorage.setItem("refresh_token", data.refresh_token);
      // }
      return access_token || "";
    }
  } catch (err) {
    console.error("Refresh Token Error:", err);
  }
  return "";
}

export type SignProps<T> = {
  redirectUrl?: string;
  options?: API.RequestOptions;
  callback?: (token: T | Promise<T>) => void;
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
  onFinish?: () => void;
  login?: (params: API.LoginForm, options?: API.RequestOptions) => Promise<AxiosResponse<API.Result<T>>>;
  logout?: (options?: API.RequestOptions) => Promise<AxiosResponse<API.Result<T>>>;
};

export const signOut = async <T,>({ logout: _logout = logout, options }: SignProps<T>) => {
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

export const signIn = async <T,>(params: API.LoginForm, { login: _login = login, options, ...props }: SignProps<T>) => {
  console.log("param value:", params);
  if (params.username !== "admin") {
    if (props.onError) {
      props.onError(new Error("Invalid username or password"));
    }
    return;
  }
  if (params.password !== "adminadmin") {
    if (props.onError) {
      props.onError(new Error("Invalid username or password"));
    }
    return;
  }

  setTimeout(() => {
    // 模拟登录成功
    const token = mockToken;
    if (token) {
      // Storage.setUserID(token.user_id);
      // Storage.setAccessToken(token.access_token);
      // const time = new Date().setTime(token.expires_at);
      // Storage.setExpirationTime(time.toString());
      // 登录成功后，跳转到 callbackUrl
      // window.location.href = param.callbackUrl;
      if (props.onSuccess) {
        props.onSuccess({ success: true, data: token } as T);
      }
    } else {
      if (props.onError) {
        props.onError(new Error("Invalid username or password"));
      }
    }
  }, 1000); // 等待 3 秒

  // try {
  //   const resp = await _login(params, options);
  //   if (!resp) {
  //     if (props.onError) {
  //       props.onError(new Error("Invalid username or password"));
  //     }
  //   }
  // } catch (error) {
  //   console.error("Error logging in:", error);
  //   if (props.onError) {
  //     props.onError(new Error("Invalid username or password"));
  //     return;
  //   }
  // }
};
