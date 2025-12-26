import auth from "@/api/auth";
import { login, logout } from "@/api/system/login";
import { mockSignIn } from "@/mocks/mock-sign-in";
import { SIGN_IN_URL } from "@/types";
import { post } from "@/utils/request";
import { getRefreshToken, removeTokens, setAuth } from "@/utils/storage";
import GlobalConfig from "@config";

/**
 * Performs the sign-in logic by either calling the mock or the real API.
 * @returns A promise that resolves with the API.Token object on success.
 * @throws An error on failure.
 */
export const signIn = async (params: API.LoginForm): Promise<API.Token> => {
  if (GlobalConfig.mocks) {
    console.log("mock login:", params);
    const result = mockSignIn(params);
    if (result.success && result.data) {
      return result.data as API.Token;
    }
    const message = result.error?.message || "Mock sign-in failed";
    throw new Error(message);
  }

  const resp = await login(params);
  if (resp && resp.success && resp.data) {
    return resp.data;
  }

  const message = resp?.message || "Invalid username or password";
  throw new Error(message);
};

// The rest of the file remains the same for now...

export async function refreshToken() {
  const { url } = auth.refreshToken;
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
      setAuth(response.data);
      return response.data.access_token || "";
    }
  } catch (err) {
    console.error("Refresh Token Error:", err);
  }
  return "";
}

export const signOut = async () => {
  const { pathname } = window.location;
  try {
    await logout();
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    removeTokens();
    if (pathname !== SIGN_IN_URL) {
      window.location.replace(SIGN_IN_URL);
    }
  }
};

export const failureRetry = (failureCount: number, error: Error) => {
  const cause = error.cause as API.Error;
  if (cause && cause.code === 500 && failureCount < 2) {
    try {
      const resp = refreshToken();
      return resp !== undefined;
    } catch (refreshError) {
      console.error("Refresh token failed", refreshError);
      return false;
    }
  }
  return false;
};
