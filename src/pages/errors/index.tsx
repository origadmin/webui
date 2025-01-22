import InternalServerError from "src/pages/errors/internal-server-error";
import ComingSoon from "./coming-soon";
import ForbiddenError from "./forbidden";
import MaintenanceError from "./maintenance-error";
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
    element: <MaintenanceError />,
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
  MaintenanceError,
  NotFoundError,
  UnauthorizedError,
};
