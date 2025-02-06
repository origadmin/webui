const config = {
  host: undefined,
  // host: process.env.NODE_ENV === "development" ? "http://localhost:25100" : HOST,
  auth: {
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
};

export default config;
