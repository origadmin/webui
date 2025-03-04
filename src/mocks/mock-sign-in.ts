export const mockSignInUser = {
  id: 1,
  username: "admin",
  password: "orig.admin",
  captcha: "1234",
};

export const mockToken = {
  user_id: "admin",
  access_token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczOTYwMzQsImlzcyI6ImxvY2FsaG9zdCIsInN1YiI6ImFkbWluIn0.nlRp027z2lnX_RtyqYOaUocUcGODvWgMw-N81Evj68XMsMBIjNXS9O9arjbIZkNXU8MFnNdweOmgMQJFhUii6A",
  refresh_token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzg1OTg0MzQsImlzcyI6ImxvY2FsaG9zdCIsInN1YiI6ImFkbWluIn0.EhuqS0I25qLJh2iMgHb-bJpKN6Jn0IOBSqDPjskPYUkNMqMHOnPeTbon_yddaiQ5mQbQie3b4IAjsCoByLmhVQ",
  expires_at: 1737396034,
  token_type: "Bearer",
};

const mockSignIn = (params: API.LoginForm) => {
  if (params.username !== mockSignInUser.username || params.password !== mockSignInUser.password) {
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
    data: mockToken,
  };
};

export { mockSignIn };
