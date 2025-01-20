import { ForbiddenError, NotFoundError } from "@/pages/errors";

const config = {
  auth: {
    refreshToken: {
      url: "/api/v1/personal/refresh",
      method: "POST",
    },
  },
  routes: {
    Forbidden: ForbiddenError,
    NotFound: NotFoundError,
  },
};

export default config;
