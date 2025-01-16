/* eslint-disable */
// @ts-ignore
import request from "@/utils/request";
import { API } from "@/types/system/typings";
/** Get captcha ID GET /api/v1/captcha/id */
export async function getCaptchaID(options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<API.Captcha>>("/api/v1/captcha/id", {
    method: "GET",
    ...(options || {}),
  });
}

/** Response captcha image GET /api/v1/captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/api/v1/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /api/v1/login */
export async function login(body: API.LoginForm, options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<API.LoginToken>>("/api/v1/login", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

/** Logout system POST /api/v1/personal/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<any>>("/api/v1/personal/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** Query personal user menus based on the personal user role GET /api/v1/personal/menus */
export async function listpersonalMenus(options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<API.Menu[]>>("/api/v1/personal/menus", {
    method: "GET",
    ...(options || {}),
  });
}

/** Change personal user password PUT /api/v1/personal/password */
export async function updatepersonalPassword(body: API.UpdateLoginPassword, options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<any>>("/api/v1/personal/password", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** Refresh personal access token POST /api/v1/personal/refresh/token */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<API.LoginToken>>("/api/v1/personal/refresh/token", {
    method: "POST",
    ...(options || {}),
  });
}

/** Get personal user info GET /api/v1/personal/user */
export async function getpersonalUser(options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<API.User>>("/api/v1/personal/user", {
    method: "GET",
    ...(options || {}),
  });
}

/** Change personal user info PUT /api/v1/personal/user */
export async function updatepersonalUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.Common.ResponseResult<any>>("/api/v1/personal/user", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>("/api/login/captcha", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
