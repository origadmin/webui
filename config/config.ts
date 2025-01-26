import { ForbiddenError, NotFoundError } from "@/pages/errors";
import { HOST } from "@/types";
import { routes } from "./route";

const config = {
  host: process.env.NODE_ENV === "development" ? "http://localhost:25100" : HOST,
  auth: {
    login: {
      url: "/api/v1/personal/login",
      method: "POST",
    },
    logout: {
      url: "/api/v1/personal/logout",
      method: "POST",
    },
    register: {
      url: "/api/v1/personal/register",
      method: "POST",
    },
    forgotPassword: {
      url: "/api/v1/personal/forgot-password",
      method: "POST",
    },
    verifyEmail: {
      url: "/api/v1/personal/verify-email",
      method: "POST",
    },
    getCaptcha: {
      url: "/api/v1/captcha/id",
      method: "GET",
      params: {
        reload: 1, // 是否重新生成验证码
        ts: new Date().getTime(), // 时间戳,防止缓存
      },
    },
    resetPassword: {
      url: "/api/v1/personal/reset-password",
      method: "POST",
    },
    refreshToken: {
      url: "/api/v1/personal/refresh",
      method: "POST",
    },
  },
  routes: routes,
  errorRoutes: {
    403: ForbiddenError,
    404: NotFoundError,
  },
};

export default config;
