const auth = {
  verifyEmail: {
    url: "/personal/verify-email",
    method: "POST",
  },
  getCaptcha: {
    url: "/captcha/id",
    method: "GET",
    params: {
      reload: 1, // 是否重新生成验证码
      ts: new Date().getTime(), // 时间戳,防止缓存
    },
  },
  resetPassword: {
    url: "/personal/reset-password",
    method: "POST",
  },
  refreshToken: {
    url: "/token/refresh",
    method: "POST",
  },
};

export default auth;
