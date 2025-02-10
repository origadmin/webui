import { Pagination } from "@/utils";
import { fetchRequest, post, get } from "@/utils/service";


/** Get captcha ID GET /api/v1/captcha/id */
export async function getCaptchaID(options?: API.RequestOptions) {
  return fetchRequest<API.Captcha>("/api/v1/captcha/id", "GET", options);
}

/** Response captcha image GET /api/v1/captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/api/v1/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /api/v1/login */
export async function login(body: API.LoginForm, options?: API.RequestOptions) {
  return post<any>("/api/v1/login", body, options);
}

/** Logout system POST /api/v1/personal/logout */
export async function logout(options?: API.RequestOptions) {
  return post<any>("/api/v1/personal/logout", undefined, options);
}

/** Query personal user menus based on the personal user role GET /api/v1/personal/menus */
export async function listPersonalMenus(params: API.Params, options?: API.RequestOptions) {
  params = Pagination.parseParams(params);
  return get<API.Result<API.Menu[]>>("/api/v1/personal/menus", params, options);
}

/** Change personal user password PUT /api/v1/personal/password */
export async function updatePersonalPassword(body: API.UpdateLoginPassword, options?: API.RequestOptions) {
  return fetchRequest<unknown>("/api/v1/personal/password", "PUT", {
    body,
    ...(options || {}),
  });
}

/** Refresh personal access token POST /api/v1/personal/refresh/token */
export async function refreshToken(options?: API.RequestOptions) {
  return fetchRequest<API.LoginToken>("/api/v1/personal/refresh/token", "POST", options);
}

/** Get personal user info GET /api/v1/personal/user */
export async function getPersonalUser(options?: API.RequestOptions) {
  return get<API.System.User>("/api/v1/personal/user", options);
}

/** Change personal user info PUT /api/v1/personal/user */
export async function updatePersonalUser(body: API.System.User, options?: API.RequestOptions) {
  return fetchRequest<unknown>("/api/v1/personal/user", "PUT", {
    body,
    ...(options || {}),
  });
}
