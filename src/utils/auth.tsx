import { login, logout } from "@/api/auth/login"; // CORRECTED: Import from the new, correct path
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

  const token = await login(params);

  if (token && token.access_token) {
    return token;
  }

  const message = (token as any)?.message || "Invalid username or password";
  throw new Error(message);
};

export async function refreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    console.warn("refresh token is empty, perhaps the system is not support refresh token");
    return "";
  }

  try {
    const response = await post<API.Token>("/auth/token", { refresh_token: refreshToken });
    if (response && response.access_token) {
      setAuth(response);
      return response.access_token || "";
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
  if (cause && cause.code === 401 && failureCount < 2) {
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
