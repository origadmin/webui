const mockLogin = (params: API.LoginForm) => {
  if (params.username !== "admin" || params.password !== "orig.admin") {
    return {
      success: false,
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid username or password",
      },
    };
  }
  return {
    success: true,
    data: {
      access_token: "mock-access-token",
      refresh_token: "mock-refresh-token",
      expires_in: 3600,
      token_type: "Bearer",
    },
  };
};

export { mockLogin };
