import { ForbiddenError, NotFoundError } from "@/pages/errors";
import { HOST } from "@/types";

const config = {
  host: process.env.NODE_ENV === "development" ? "http://localhost:25100" : HOST,
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
