import InternalServerError from "src/pages/errors/internal-server-error";
import ServiceTemporarilyUnavailableError from "src/pages/errors/service-temporarily-unavailable-error";
import ComingSoon from "./coming-soon";
import ForbiddenError from "./forbidden-error";
import NotFoundError from "./not-found-error";
import UnauthorizedError from "./unauthorized-error";

const errorRoutes = [
  {
    path: "/401",
    element: <UnauthorizedError />,
  },
  {
    path: "/403",
    element: <ForbiddenError />,
  },
  {
    path: "/404",
    element: <NotFoundError />,
  },
  {
    path: "/500",
    element: <InternalServerError />,
  },
  {
    path: "/503",
    element: <ServiceTemporarilyUnavailableError />,
  },
];

const comingSoonRoutes = [
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
];

export {
  errorRoutes,
  comingSoonRoutes,
  ComingSoon,
  ForbiddenError,
  InternalServerError,
  ServiceTemporarilyUnavailableError,
  NotFoundError,
  UnauthorizedError,
};
