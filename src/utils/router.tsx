import { NotFoundError, ForbiddenError } from "@/pages/errors";
import { RouteObject } from "react-router-dom";

export const initRouter = (oldRoutes: RouteObject[], routes?: RouteObject[]) => {
  const newRoutes = oldRoutes;
  if (!routes) {
    return newRoutes;
  }
  const notFoundIndex = routes.findIndex((route) => route.path === "*" || route.path === "/404");
  if (notFoundIndex === -1) {
    // 插入 path="*" 或 path="/404" 的路由
    newRoutes.push({
      path: "*",
      Component: NotFoundError,
    });
    newRoutes.push({
      path: "/404",
      Component: NotFoundError,
    });
  } else {
    newRoutes[notFoundIndex] = {
      path: "*",
      Component: NotFoundError,
    };
    newRoutes[notFoundIndex + 1] = {
      path: "/404",
      Component: NotFoundError,
    };
  }
  // 插入 path="/403" 的路由
  const forbiddenIndex = routes.findIndex((route) => route.path === "/403");
  if (forbiddenIndex === -1) {
    newRoutes.push({
      path: "/403",
      Component: ForbiddenError,
    });
  } else {
    newRoutes[forbiddenIndex] = {
      path: "/403",
      Component: ForbiddenError,
    };
  }
  console.log("update routes", newRoutes);
  return newRoutes;
};
