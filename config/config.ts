import { ForbiddenError, NotFoundError } from "@/pages/errors";
import { HOST } from "@/types";
import { routes } from "./route";

const config = {
  host: process.env.NODE_ENV === "development" ? "http://localhost:25100" : HOST,
  auth: {
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
