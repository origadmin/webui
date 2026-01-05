import { get, post } from "@/utils/request";

/** Login system with username and password POST /auth/login */
export async function login(body: API.LoginForm, options?: API.RequestOptions) {
  return post<API.Token>("/auth/login", body, options);
}

/** Logout system POST /auth/logout */
export async function logout(options?: API.RequestOptions) {
  return post<never>("/auth/logout", undefined, options);
}

/**
 * Get captcha data (ID and Base64 image) in one call.
 * GET /auth/captcha
 */
export async function getCaptcha(params?: API.SearchParams, options?: API.RequestOptions) {
  // Use the correct, locally defined type that matches the real-world response.
  return get<API.Captcha>("/auth/captcha", params, options);
}
