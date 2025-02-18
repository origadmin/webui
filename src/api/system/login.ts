import { post, get, put } from "@/utils/request";


/** Get captcha ID GET /captcha/id */
export async function getCaptchaID(options?: API.RequestOptions) {
  return get<API.Captcha>("/captcha/id", options);
}

/** Response captcha image GET /captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /login */
export async function login<T extends API.Token = API.Token>(body: API.LoginForm, options?: API.RequestOptions) {
  return post<T>("/login", body, options);
}

/** Logout system POST /personal/logout */
export async function logout(options?: API.RequestOptions) {
  return post<never>("/personal/logout", options);
}

/** Query personal user menus based on the personal user role GET /personal/menus */
export async function listPersonalMenus(params: API.SearchParams, options?: API.RequestOptions) {
  options = {
    params,
    ...options,
  };
  return get<API.System.Menu[]>("/personal/menus", options);
}

/** Change personal user password PUT /personal/password */
export async function updatePersonalPassword(body: API.UpdateLoginPassword, options?: API.RequestOptions) {
  return put<unknown>("/personal/password", body, options);
}

/** Refresh personal access token POST /personal/refresh/token */
export async function refreshToken(options?: API.RequestOptions) {
  return post<API.LoginToken>("/personal/refresh/token", options);
}

/** Get personal user info GET /personal/user */
export async function getPersonalUser(options?: API.RequestOptions) {
  return get<API.System.User>("/personal/user", options);
}

/** Change personal user info PUT /personal/user */
export async function updatePersonalUser(body: API.System.User, options?: API.RequestOptions) {
  return put<unknown>("/personal/user", body, options);
}
