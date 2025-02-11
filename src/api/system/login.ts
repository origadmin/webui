import { Pagination } from "@/utils";
import { post, get, put } from "@/utils/request";

/** Get captcha ID GET /api/v1/captcha/id */
export async function getCaptchaID(options?: API.RequestOptions) {
  return get<API.Captcha>("/api/v1/captcha/id", options);
}

/** Response captcha image GET /api/v1/captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/api/v1/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /api/v1/login */
export async function login(body: API.LoginForm, options?: API.RequestOptions) {
  return post<API.Token>("/api/v1/login", body, options);
}

/** Logout system POST /api/v1/personal/logout */
export async function logout(options?: API.RequestOptions) {
  return post<never>("/api/v1/personal/logout", options);
}

/** Query personal user menus based on the personal user role GET /api/v1/personal/menus */
export async function listPersonalMenus(params: API.Params, options?: API.RequestOptions) {
  options = {
    params: Pagination.parseParams(params),
    ...options,
  };
  return get<API.System.Menu[]>("/api/v1/personal/menus", options);
}

/** Change personal user password PUT /api/v1/personal/password */
export async function updatePersonalPassword(body: API.UpdateLoginPassword, options?: API.RequestOptions) {
  return put<unknown>("/api/v1/personal/password", body, options);
}

/** Refresh personal access token POST /api/v1/personal/refresh/token */
export async function refreshToken(options?: API.RequestOptions) {
  return post<API.LoginToken>("/api/v1/personal/refresh/token", options);
}

/** Get personal user info GET /api/v1/personal/user */
export async function getPersonalUser(options?: API.RequestOptions) {
  return get<API.System.User>("/api/v1/personal/user", options);
}

/** Change personal user info PUT /api/v1/personal/user */
export async function updatePersonalUser(body: API.System.User, options?: API.RequestOptions) {
  return put<unknown>("/api/v1/personal/user", body, options);
}
