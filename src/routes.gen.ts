/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as OpenapiImport } from "./routes/openapi";
import { Route as AuthorizationImport } from "./routes/_authorization";
import { Route as AuthorizationIndexImport } from "./routes/_authorization/index";
import { Route as ErrorsComingSoonImport } from "./routes/(Errors)/coming-soon";
import { Route as Errors503Import } from "./routes/(Errors)/503";
import { Route as Errors500Import } from "./routes/(Errors)/500";
import { Route as Errors404Import } from "./routes/(Errors)/404";
import { Route as Errors403Import } from "./routes/(Errors)/403";
import { Route as Errors401Import } from "./routes/(Errors)/401";
import { Route as AuthSignUpImport } from "./routes/(Auth)/sign-up";
import { Route as AuthSignIn2Import } from "./routes/(Auth)/sign-in-2";
import { Route as AuthSignInImport } from "./routes/(Auth)/sign-in";
import { Route as AuthOtpImport } from "./routes/(Auth)/otp";
import { Route as AuthForgotPasswordImport } from "./routes/(Auth)/forgot-password";
import { Route as AuthorizationTasksIndexImport } from "./routes/_authorization/tasks/index";
import { Route as AuthorizationExamplesIndexImport } from "./routes/_authorization/examples/index";
import { Route as AuthorizationDashboardIndexImport } from "./routes/_authorization/dashboard/index";
import { Route as AuthorizationChatsIndexImport } from "./routes/_authorization/chats/index";
import { Route as AuthorizationAppsIndexImport } from "./routes/_authorization/apps/index";
import { Route as AuthorizationDashboardSettingsImport } from "./routes/_authorization/dashboard/settings";
import { Route as AuthorizationDashboardProductsImport } from "./routes/_authorization/dashboard/products";
import { Route as AuthorizationDashboardOverviewImport } from "./routes/_authorization/dashboard/overview";
import { Route as AuthorizationDashboardMonitorImport } from "./routes/_authorization/dashboard/monitor";
import { Route as AuthorizationDashboardCustomersImport } from "./routes/_authorization/dashboard/customers";
import { Route as AuthorizationExamplesListIndexImport } from "./routes/_authorization/examples/list/index";
import { Route as AuthorizationExamplesFormIndexImport } from "./routes/_authorization/examples/form/index";
import { Route as AuthorizationExamplesFormSimpleImport } from "./routes/_authorization/examples/form/simple";
import { Route as AuthorizationExamplesFormBasicImport } from "./routes/_authorization/examples/form/basic";
import { Route as AuthorizationExamplesFormAdvancedImport } from "./routes/_authorization/examples/form/advanced";

// Create Virtual Routes

const AuthorizationSystemUserLazyImport = createFileRoute(
  "/_authorization/system/user",
)();
const AuthorizationSystemSettingsLazyImport = createFileRoute(
  "/_authorization/system/settings",
)();
const AuthorizationSystemRoleLazyImport = createFileRoute(
  "/_authorization/system/role",
)();
const AuthorizationSystemResourceLazyImport = createFileRoute(
  "/_authorization/system/resource",
)();
const AuthorizationSystemPermissionLazyImport = createFileRoute(
  "/_authorization/system/permission",
)();

// Create/Update Routes

const OpenapiRoute = OpenapiImport.update({
  id: "/openapi",
  path: "/openapi",
  getParentRoute: () => rootRoute,
} as any);

const AuthorizationRoute = AuthorizationImport.update({
  id: "/_authorization",
  getParentRoute: () => rootRoute,
} as any);

const AuthorizationIndexRoute = AuthorizationIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthorizationRoute,
} as any);

const ErrorsComingSoonRoute = ErrorsComingSoonImport.update({
  id: "/(Errors)/coming-soon",
  path: "/coming-soon",
  getParentRoute: () => rootRoute,
} as any);

const Errors503Route = Errors503Import.update({
  id: "/(Errors)/503",
  path: "/503",
  getParentRoute: () => rootRoute,
} as any);

const Errors500Route = Errors500Import.update({
  id: "/(Errors)/500",
  path: "/500",
  getParentRoute: () => rootRoute,
} as any);

const Errors404Route = Errors404Import.update({
  id: "/(Errors)/404",
  path: "/404",
  getParentRoute: () => rootRoute,
} as any);

const Errors403Route = Errors403Import.update({
  id: "/(Errors)/403",
  path: "/403",
  getParentRoute: () => rootRoute,
} as any);

const Errors401Route = Errors401Import.update({
  id: "/(Errors)/401",
  path: "/401",
  getParentRoute: () => rootRoute,
} as any);

const AuthSignUpRoute = AuthSignUpImport.update({
  id: "/(Auth)/sign-up",
  path: "/sign-up",
  getParentRoute: () => rootRoute,
} as any);

const AuthSignIn2Route = AuthSignIn2Import.update({
  id: "/(Auth)/sign-in-2",
  path: "/sign-in-2",
  getParentRoute: () => rootRoute,
} as any);

const AuthSignInRoute = AuthSignInImport.update({
  id: "/(Auth)/sign-in",
  path: "/sign-in",
  getParentRoute: () => rootRoute,
} as any);

const AuthOtpRoute = AuthOtpImport.update({
  id: "/(Auth)/otp",
  path: "/otp",
  getParentRoute: () => rootRoute,
} as any);

const AuthForgotPasswordRoute = AuthForgotPasswordImport.update({
  id: "/(Auth)/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => rootRoute,
} as any);

const AuthorizationTasksIndexRoute = AuthorizationTasksIndexImport.update({
  id: "/tasks/",
  path: "/tasks/",
  getParentRoute: () => AuthorizationRoute,
} as any);

const AuthorizationExamplesIndexRoute = AuthorizationExamplesIndexImport.update(
  {
    id: "/examples/",
    path: "/examples/",
    getParentRoute: () => AuthorizationRoute,
  } as any,
);

const AuthorizationDashboardIndexRoute =
  AuthorizationDashboardIndexImport.update({
    id: "/dashboard/",
    path: "/dashboard/",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationChatsIndexRoute = AuthorizationChatsIndexImport.update({
  id: "/chats/",
  path: "/chats/",
  getParentRoute: () => AuthorizationRoute,
} as any);

const AuthorizationAppsIndexRoute = AuthorizationAppsIndexImport.update({
  id: "/apps/",
  path: "/apps/",
  getParentRoute: () => AuthorizationRoute,
} as any);

const AuthorizationSystemUserLazyRoute =
  AuthorizationSystemUserLazyImport.update({
    id: "/system/user",
    path: "/system/user",
    getParentRoute: () => AuthorizationRoute,
  } as any).lazy(() =>
    import("./routes/_authorization/system/user.lazy").then((d) => d.Route),
  );

const AuthorizationSystemSettingsLazyRoute =
  AuthorizationSystemSettingsLazyImport.update({
    id: "/system/settings",
    path: "/system/settings",
    getParentRoute: () => AuthorizationRoute,
  } as any).lazy(() =>
    import("./routes/_authorization/system/settings.lazy").then((d) => d.Route),
  );

const AuthorizationSystemRoleLazyRoute =
  AuthorizationSystemRoleLazyImport.update({
    id: "/system/role",
    path: "/system/role",
    getParentRoute: () => AuthorizationRoute,
  } as any).lazy(() =>
    import("./routes/_authorization/system/role.lazy").then((d) => d.Route),
  );

const AuthorizationSystemResourceLazyRoute =
  AuthorizationSystemResourceLazyImport.update({
    id: "/system/resource",
    path: "/system/resource",
    getParentRoute: () => AuthorizationRoute,
  } as any).lazy(() =>
    import("./routes/_authorization/system/resource.lazy").then((d) => d.Route),
  );

const AuthorizationSystemPermissionLazyRoute =
  AuthorizationSystemPermissionLazyImport.update({
    id: "/system/permission",
    path: "/system/permission",
    getParentRoute: () => AuthorizationRoute,
  } as any).lazy(() =>
    import("./routes/_authorization/system/permission.lazy").then(
      (d) => d.Route,
    ),
  );

const AuthorizationDashboardSettingsRoute =
  AuthorizationDashboardSettingsImport.update({
    id: "/dashboard/settings",
    path: "/dashboard/settings",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationDashboardProductsRoute =
  AuthorizationDashboardProductsImport.update({
    id: "/dashboard/products",
    path: "/dashboard/products",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationDashboardOverviewRoute =
  AuthorizationDashboardOverviewImport.update({
    id: "/dashboard/overview",
    path: "/dashboard/overview",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationDashboardMonitorRoute =
  AuthorizationDashboardMonitorImport.update({
    id: "/dashboard/monitor",
    path: "/dashboard/monitor",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationDashboardCustomersRoute =
  AuthorizationDashboardCustomersImport.update({
    id: "/dashboard/customers",
    path: "/dashboard/customers",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationExamplesListIndexRoute =
  AuthorizationExamplesListIndexImport.update({
    id: "/examples/list/",
    path: "/examples/list/",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationExamplesFormIndexRoute =
  AuthorizationExamplesFormIndexImport.update({
    id: "/examples/form/",
    path: "/examples/form/",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationExamplesFormSimpleRoute =
  AuthorizationExamplesFormSimpleImport.update({
    id: "/examples/form/simple",
    path: "/examples/form/simple",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationExamplesFormBasicRoute =
  AuthorizationExamplesFormBasicImport.update({
    id: "/examples/form/basic",
    path: "/examples/form/basic",
    getParentRoute: () => AuthorizationRoute,
  } as any);

const AuthorizationExamplesFormAdvancedRoute =
  AuthorizationExamplesFormAdvancedImport.update({
    id: "/examples/form/advanced",
    path: "/examples/form/advanced",
    getParentRoute: () => AuthorizationRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_authorization": {
      id: "/_authorization";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthorizationImport;
      parentRoute: typeof rootRoute;
    };
    "/openapi": {
      id: "/openapi";
      path: "/openapi";
      fullPath: "/openapi";
      preLoaderRoute: typeof OpenapiImport;
      parentRoute: typeof rootRoute;
    };
    "/(Auth)/forgot-password": {
      id: "/(Auth)/forgot-password";
      path: "/forgot-password";
      fullPath: "/forgot-password";
      preLoaderRoute: typeof AuthForgotPasswordImport;
      parentRoute: typeof rootRoute;
    };
    "/(Auth)/otp": {
      id: "/(Auth)/otp";
      path: "/otp";
      fullPath: "/otp";
      preLoaderRoute: typeof AuthOtpImport;
      parentRoute: typeof rootRoute;
    };
    "/(Auth)/sign-in": {
      id: "/(Auth)/sign-in";
      path: "/sign-in";
      fullPath: "/sign-in";
      preLoaderRoute: typeof AuthSignInImport;
      parentRoute: typeof rootRoute;
    };
    "/(Auth)/sign-in-2": {
      id: "/(Auth)/sign-in-2";
      path: "/sign-in-2";
      fullPath: "/sign-in-2";
      preLoaderRoute: typeof AuthSignIn2Import;
      parentRoute: typeof rootRoute;
    };
    "/(Auth)/sign-up": {
      id: "/(Auth)/sign-up";
      path: "/sign-up";
      fullPath: "/sign-up";
      preLoaderRoute: typeof AuthSignUpImport;
      parentRoute: typeof rootRoute;
    };
    "/(Errors)/401": {
      id: "/(Errors)/401";
      path: "/401";
      fullPath: "/401";
      preLoaderRoute: typeof Errors401Import;
      parentRoute: typeof rootRoute;
    };
    "/(Errors)/403": {
      id: "/(Errors)/403";
      path: "/403";
      fullPath: "/403";
      preLoaderRoute: typeof Errors403Import;
      parentRoute: typeof rootRoute;
    };
    "/(Errors)/404": {
      id: "/(Errors)/404";
      path: "/404";
      fullPath: "/404";
      preLoaderRoute: typeof Errors404Import;
      parentRoute: typeof rootRoute;
    };
    "/(Errors)/500": {
      id: "/(Errors)/500";
      path: "/500";
      fullPath: "/500";
      preLoaderRoute: typeof Errors500Import;
      parentRoute: typeof rootRoute;
    };
    "/(Errors)/503": {
      id: "/(Errors)/503";
      path: "/503";
      fullPath: "/503";
      preLoaderRoute: typeof Errors503Import;
      parentRoute: typeof rootRoute;
    };
    "/(Errors)/coming-soon": {
      id: "/(Errors)/coming-soon";
      path: "/coming-soon";
      fullPath: "/coming-soon";
      preLoaderRoute: typeof ErrorsComingSoonImport;
      parentRoute: typeof rootRoute;
    };
    "/_authorization/": {
      id: "/_authorization/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof AuthorizationIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/dashboard/customers": {
      id: "/_authorization/dashboard/customers";
      path: "/dashboard/customers";
      fullPath: "/dashboard/customers";
      preLoaderRoute: typeof AuthorizationDashboardCustomersImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/dashboard/monitor": {
      id: "/_authorization/dashboard/monitor";
      path: "/dashboard/monitor";
      fullPath: "/dashboard/monitor";
      preLoaderRoute: typeof AuthorizationDashboardMonitorImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/dashboard/overview": {
      id: "/_authorization/dashboard/overview";
      path: "/dashboard/overview";
      fullPath: "/dashboard/overview";
      preLoaderRoute: typeof AuthorizationDashboardOverviewImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/dashboard/products": {
      id: "/_authorization/dashboard/products";
      path: "/dashboard/products";
      fullPath: "/dashboard/products";
      preLoaderRoute: typeof AuthorizationDashboardProductsImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/dashboard/settings": {
      id: "/_authorization/dashboard/settings";
      path: "/dashboard/settings";
      fullPath: "/dashboard/settings";
      preLoaderRoute: typeof AuthorizationDashboardSettingsImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/system/permission": {
      id: "/_authorization/system/permission";
      path: "/system/permission";
      fullPath: "/system/permission";
      preLoaderRoute: typeof AuthorizationSystemPermissionLazyImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/system/resource": {
      id: "/_authorization/system/resource";
      path: "/system/resource";
      fullPath: "/system/resource";
      preLoaderRoute: typeof AuthorizationSystemResourceLazyImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/system/role": {
      id: "/_authorization/system/role";
      path: "/system/role";
      fullPath: "/system/role";
      preLoaderRoute: typeof AuthorizationSystemRoleLazyImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/system/settings": {
      id: "/_authorization/system/settings";
      path: "/system/settings";
      fullPath: "/system/settings";
      preLoaderRoute: typeof AuthorizationSystemSettingsLazyImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/system/user": {
      id: "/_authorization/system/user";
      path: "/system/user";
      fullPath: "/system/user";
      preLoaderRoute: typeof AuthorizationSystemUserLazyImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/apps/": {
      id: "/_authorization/apps/";
      path: "/apps";
      fullPath: "/apps";
      preLoaderRoute: typeof AuthorizationAppsIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/chats/": {
      id: "/_authorization/chats/";
      path: "/chats";
      fullPath: "/chats";
      preLoaderRoute: typeof AuthorizationChatsIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/dashboard/": {
      id: "/_authorization/dashboard/";
      path: "/dashboard";
      fullPath: "/dashboard";
      preLoaderRoute: typeof AuthorizationDashboardIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/examples/": {
      id: "/_authorization/examples/";
      path: "/examples";
      fullPath: "/examples";
      preLoaderRoute: typeof AuthorizationExamplesIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/tasks/": {
      id: "/_authorization/tasks/";
      path: "/tasks";
      fullPath: "/tasks";
      preLoaderRoute: typeof AuthorizationTasksIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/examples/form/advanced": {
      id: "/_authorization/examples/form/advanced";
      path: "/examples/form/advanced";
      fullPath: "/examples/form/advanced";
      preLoaderRoute: typeof AuthorizationExamplesFormAdvancedImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/examples/form/basic": {
      id: "/_authorization/examples/form/basic";
      path: "/examples/form/basic";
      fullPath: "/examples/form/basic";
      preLoaderRoute: typeof AuthorizationExamplesFormBasicImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/examples/form/simple": {
      id: "/_authorization/examples/form/simple";
      path: "/examples/form/simple";
      fullPath: "/examples/form/simple";
      preLoaderRoute: typeof AuthorizationExamplesFormSimpleImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/examples/form/": {
      id: "/_authorization/examples/form/";
      path: "/examples/form";
      fullPath: "/examples/form";
      preLoaderRoute: typeof AuthorizationExamplesFormIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
    "/_authorization/examples/list/": {
      id: "/_authorization/examples/list/";
      path: "/examples/list";
      fullPath: "/examples/list";
      preLoaderRoute: typeof AuthorizationExamplesListIndexImport;
      parentRoute: typeof AuthorizationImport;
    };
  }
}

// Create and export the route tree

interface AuthorizationRouteChildren {
  AuthorizationIndexRoute: typeof AuthorizationIndexRoute;
  AuthorizationDashboardCustomersRoute: typeof AuthorizationDashboardCustomersRoute;
  AuthorizationDashboardMonitorRoute: typeof AuthorizationDashboardMonitorRoute;
  AuthorizationDashboardOverviewRoute: typeof AuthorizationDashboardOverviewRoute;
  AuthorizationDashboardProductsRoute: typeof AuthorizationDashboardProductsRoute;
  AuthorizationDashboardSettingsRoute: typeof AuthorizationDashboardSettingsRoute;
  AuthorizationSystemPermissionLazyRoute: typeof AuthorizationSystemPermissionLazyRoute;
  AuthorizationSystemResourceLazyRoute: typeof AuthorizationSystemResourceLazyRoute;
  AuthorizationSystemRoleLazyRoute: typeof AuthorizationSystemRoleLazyRoute;
  AuthorizationSystemSettingsLazyRoute: typeof AuthorizationSystemSettingsLazyRoute;
  AuthorizationSystemUserLazyRoute: typeof AuthorizationSystemUserLazyRoute;
  AuthorizationAppsIndexRoute: typeof AuthorizationAppsIndexRoute;
  AuthorizationChatsIndexRoute: typeof AuthorizationChatsIndexRoute;
  AuthorizationDashboardIndexRoute: typeof AuthorizationDashboardIndexRoute;
  AuthorizationExamplesIndexRoute: typeof AuthorizationExamplesIndexRoute;
  AuthorizationTasksIndexRoute: typeof AuthorizationTasksIndexRoute;
  AuthorizationExamplesFormAdvancedRoute: typeof AuthorizationExamplesFormAdvancedRoute;
  AuthorizationExamplesFormBasicRoute: typeof AuthorizationExamplesFormBasicRoute;
  AuthorizationExamplesFormSimpleRoute: typeof AuthorizationExamplesFormSimpleRoute;
  AuthorizationExamplesFormIndexRoute: typeof AuthorizationExamplesFormIndexRoute;
  AuthorizationExamplesListIndexRoute: typeof AuthorizationExamplesListIndexRoute;
}

const AuthorizationRouteChildren: AuthorizationRouteChildren = {
  AuthorizationIndexRoute: AuthorizationIndexRoute,
  AuthorizationDashboardCustomersRoute: AuthorizationDashboardCustomersRoute,
  AuthorizationDashboardMonitorRoute: AuthorizationDashboardMonitorRoute,
  AuthorizationDashboardOverviewRoute: AuthorizationDashboardOverviewRoute,
  AuthorizationDashboardProductsRoute: AuthorizationDashboardProductsRoute,
  AuthorizationDashboardSettingsRoute: AuthorizationDashboardSettingsRoute,
  AuthorizationSystemPermissionLazyRoute:
    AuthorizationSystemPermissionLazyRoute,
  AuthorizationSystemResourceLazyRoute: AuthorizationSystemResourceLazyRoute,
  AuthorizationSystemRoleLazyRoute: AuthorizationSystemRoleLazyRoute,
  AuthorizationSystemSettingsLazyRoute: AuthorizationSystemSettingsLazyRoute,
  AuthorizationSystemUserLazyRoute: AuthorizationSystemUserLazyRoute,
  AuthorizationAppsIndexRoute: AuthorizationAppsIndexRoute,
  AuthorizationChatsIndexRoute: AuthorizationChatsIndexRoute,
  AuthorizationDashboardIndexRoute: AuthorizationDashboardIndexRoute,
  AuthorizationExamplesIndexRoute: AuthorizationExamplesIndexRoute,
  AuthorizationTasksIndexRoute: AuthorizationTasksIndexRoute,
  AuthorizationExamplesFormAdvancedRoute:
    AuthorizationExamplesFormAdvancedRoute,
  AuthorizationExamplesFormBasicRoute: AuthorizationExamplesFormBasicRoute,
  AuthorizationExamplesFormSimpleRoute: AuthorizationExamplesFormSimpleRoute,
  AuthorizationExamplesFormIndexRoute: AuthorizationExamplesFormIndexRoute,
  AuthorizationExamplesListIndexRoute: AuthorizationExamplesListIndexRoute,
};

const AuthorizationRouteWithChildren = AuthorizationRoute._addFileChildren(
  AuthorizationRouteChildren,
);

export interface FileRoutesByFullPath {
  "": typeof AuthorizationRouteWithChildren;
  "/openapi": typeof OpenapiRoute;
  "/forgot-password": typeof AuthForgotPasswordRoute;
  "/otp": typeof AuthOtpRoute;
  "/sign-in": typeof AuthSignInRoute;
  "/sign-in-2": typeof AuthSignIn2Route;
  "/sign-up": typeof AuthSignUpRoute;
  "/401": typeof Errors401Route;
  "/403": typeof Errors403Route;
  "/404": typeof Errors404Route;
  "/500": typeof Errors500Route;
  "/503": typeof Errors503Route;
  "/coming-soon": typeof ErrorsComingSoonRoute;
  "/": typeof AuthorizationIndexRoute;
  "/dashboard/customers": typeof AuthorizationDashboardCustomersRoute;
  "/dashboard/monitor": typeof AuthorizationDashboardMonitorRoute;
  "/dashboard/overview": typeof AuthorizationDashboardOverviewRoute;
  "/dashboard/products": typeof AuthorizationDashboardProductsRoute;
  "/dashboard/settings": typeof AuthorizationDashboardSettingsRoute;
  "/system/permission": typeof AuthorizationSystemPermissionLazyRoute;
  "/system/resource": typeof AuthorizationSystemResourceLazyRoute;
  "/system/role": typeof AuthorizationSystemRoleLazyRoute;
  "/system/settings": typeof AuthorizationSystemSettingsLazyRoute;
  "/system/user": typeof AuthorizationSystemUserLazyRoute;
  "/apps": typeof AuthorizationAppsIndexRoute;
  "/chats": typeof AuthorizationChatsIndexRoute;
  "/dashboard": typeof AuthorizationDashboardIndexRoute;
  "/examples": typeof AuthorizationExamplesIndexRoute;
  "/tasks": typeof AuthorizationTasksIndexRoute;
  "/examples/form/advanced": typeof AuthorizationExamplesFormAdvancedRoute;
  "/examples/form/basic": typeof AuthorizationExamplesFormBasicRoute;
  "/examples/form/simple": typeof AuthorizationExamplesFormSimpleRoute;
  "/examples/form": typeof AuthorizationExamplesFormIndexRoute;
  "/examples/list": typeof AuthorizationExamplesListIndexRoute;
}

export interface FileRoutesByTo {
  "/openapi": typeof OpenapiRoute;
  "/forgot-password": typeof AuthForgotPasswordRoute;
  "/otp": typeof AuthOtpRoute;
  "/sign-in": typeof AuthSignInRoute;
  "/sign-in-2": typeof AuthSignIn2Route;
  "/sign-up": typeof AuthSignUpRoute;
  "/401": typeof Errors401Route;
  "/403": typeof Errors403Route;
  "/404": typeof Errors404Route;
  "/500": typeof Errors500Route;
  "/503": typeof Errors503Route;
  "/coming-soon": typeof ErrorsComingSoonRoute;
  "/": typeof AuthorizationIndexRoute;
  "/dashboard/customers": typeof AuthorizationDashboardCustomersRoute;
  "/dashboard/monitor": typeof AuthorizationDashboardMonitorRoute;
  "/dashboard/overview": typeof AuthorizationDashboardOverviewRoute;
  "/dashboard/products": typeof AuthorizationDashboardProductsRoute;
  "/dashboard/settings": typeof AuthorizationDashboardSettingsRoute;
  "/system/permission": typeof AuthorizationSystemPermissionLazyRoute;
  "/system/resource": typeof AuthorizationSystemResourceLazyRoute;
  "/system/role": typeof AuthorizationSystemRoleLazyRoute;
  "/system/settings": typeof AuthorizationSystemSettingsLazyRoute;
  "/system/user": typeof AuthorizationSystemUserLazyRoute;
  "/apps": typeof AuthorizationAppsIndexRoute;
  "/chats": typeof AuthorizationChatsIndexRoute;
  "/dashboard": typeof AuthorizationDashboardIndexRoute;
  "/examples": typeof AuthorizationExamplesIndexRoute;
  "/tasks": typeof AuthorizationTasksIndexRoute;
  "/examples/form/advanced": typeof AuthorizationExamplesFormAdvancedRoute;
  "/examples/form/basic": typeof AuthorizationExamplesFormBasicRoute;
  "/examples/form/simple": typeof AuthorizationExamplesFormSimpleRoute;
  "/examples/form": typeof AuthorizationExamplesFormIndexRoute;
  "/examples/list": typeof AuthorizationExamplesListIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_authorization": typeof AuthorizationRouteWithChildren;
  "/openapi": typeof OpenapiRoute;
  "/(Auth)/forgot-password": typeof AuthForgotPasswordRoute;
  "/(Auth)/otp": typeof AuthOtpRoute;
  "/(Auth)/sign-in": typeof AuthSignInRoute;
  "/(Auth)/sign-in-2": typeof AuthSignIn2Route;
  "/(Auth)/sign-up": typeof AuthSignUpRoute;
  "/(Errors)/401": typeof Errors401Route;
  "/(Errors)/403": typeof Errors403Route;
  "/(Errors)/404": typeof Errors404Route;
  "/(Errors)/500": typeof Errors500Route;
  "/(Errors)/503": typeof Errors503Route;
  "/(Errors)/coming-soon": typeof ErrorsComingSoonRoute;
  "/_authorization/": typeof AuthorizationIndexRoute;
  "/_authorization/dashboard/customers": typeof AuthorizationDashboardCustomersRoute;
  "/_authorization/dashboard/monitor": typeof AuthorizationDashboardMonitorRoute;
  "/_authorization/dashboard/overview": typeof AuthorizationDashboardOverviewRoute;
  "/_authorization/dashboard/products": typeof AuthorizationDashboardProductsRoute;
  "/_authorization/dashboard/settings": typeof AuthorizationDashboardSettingsRoute;
  "/_authorization/system/permission": typeof AuthorizationSystemPermissionLazyRoute;
  "/_authorization/system/resource": typeof AuthorizationSystemResourceLazyRoute;
  "/_authorization/system/role": typeof AuthorizationSystemRoleLazyRoute;
  "/_authorization/system/settings": typeof AuthorizationSystemSettingsLazyRoute;
  "/_authorization/system/user": typeof AuthorizationSystemUserLazyRoute;
  "/_authorization/apps/": typeof AuthorizationAppsIndexRoute;
  "/_authorization/chats/": typeof AuthorizationChatsIndexRoute;
  "/_authorization/dashboard/": typeof AuthorizationDashboardIndexRoute;
  "/_authorization/examples/": typeof AuthorizationExamplesIndexRoute;
  "/_authorization/tasks/": typeof AuthorizationTasksIndexRoute;
  "/_authorization/examples/form/advanced": typeof AuthorizationExamplesFormAdvancedRoute;
  "/_authorization/examples/form/basic": typeof AuthorizationExamplesFormBasicRoute;
  "/_authorization/examples/form/simple": typeof AuthorizationExamplesFormSimpleRoute;
  "/_authorization/examples/form/": typeof AuthorizationExamplesFormIndexRoute;
  "/_authorization/examples/list/": typeof AuthorizationExamplesListIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | ""
    | "/openapi"
    | "/forgot-password"
    | "/otp"
    | "/sign-in"
    | "/sign-in-2"
    | "/sign-up"
    | "/401"
    | "/403"
    | "/404"
    | "/500"
    | "/503"
    | "/coming-soon"
    | "/"
    | "/dashboard/customers"
    | "/dashboard/monitor"
    | "/dashboard/overview"
    | "/dashboard/products"
    | "/dashboard/settings"
    | "/system/permission"
    | "/system/resource"
    | "/system/role"
    | "/system/settings"
    | "/system/user"
    | "/apps"
    | "/chats"
    | "/dashboard"
    | "/examples"
    | "/tasks"
    | "/examples/form/advanced"
    | "/examples/form/basic"
    | "/examples/form/simple"
    | "/examples/form"
    | "/examples/list";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/openapi"
    | "/forgot-password"
    | "/otp"
    | "/sign-in"
    | "/sign-in-2"
    | "/sign-up"
    | "/401"
    | "/403"
    | "/404"
    | "/500"
    | "/503"
    | "/coming-soon"
    | "/"
    | "/dashboard/customers"
    | "/dashboard/monitor"
    | "/dashboard/overview"
    | "/dashboard/products"
    | "/dashboard/settings"
    | "/system/permission"
    | "/system/resource"
    | "/system/role"
    | "/system/settings"
    | "/system/user"
    | "/apps"
    | "/chats"
    | "/dashboard"
    | "/examples"
    | "/tasks"
    | "/examples/form/advanced"
    | "/examples/form/basic"
    | "/examples/form/simple"
    | "/examples/form"
    | "/examples/list";
  id:
    | "__root__"
    | "/_authorization"
    | "/openapi"
    | "/(Auth)/forgot-password"
    | "/(Auth)/otp"
    | "/(Auth)/sign-in"
    | "/(Auth)/sign-in-2"
    | "/(Auth)/sign-up"
    | "/(Errors)/401"
    | "/(Errors)/403"
    | "/(Errors)/404"
    | "/(Errors)/500"
    | "/(Errors)/503"
    | "/(Errors)/coming-soon"
    | "/_authorization/"
    | "/_authorization/dashboard/customers"
    | "/_authorization/dashboard/monitor"
    | "/_authorization/dashboard/overview"
    | "/_authorization/dashboard/products"
    | "/_authorization/dashboard/settings"
    | "/_authorization/system/permission"
    | "/_authorization/system/resource"
    | "/_authorization/system/role"
    | "/_authorization/system/settings"
    | "/_authorization/system/user"
    | "/_authorization/apps/"
    | "/_authorization/chats/"
    | "/_authorization/dashboard/"
    | "/_authorization/examples/"
    | "/_authorization/tasks/"
    | "/_authorization/examples/form/advanced"
    | "/_authorization/examples/form/basic"
    | "/_authorization/examples/form/simple"
    | "/_authorization/examples/form/"
    | "/_authorization/examples/list/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AuthorizationRoute: typeof AuthorizationRouteWithChildren;
  OpenapiRoute: typeof OpenapiRoute;
  AuthForgotPasswordRoute: typeof AuthForgotPasswordRoute;
  AuthOtpRoute: typeof AuthOtpRoute;
  AuthSignInRoute: typeof AuthSignInRoute;
  AuthSignIn2Route: typeof AuthSignIn2Route;
  AuthSignUpRoute: typeof AuthSignUpRoute;
  Errors401Route: typeof Errors401Route;
  Errors403Route: typeof Errors403Route;
  Errors404Route: typeof Errors404Route;
  Errors500Route: typeof Errors500Route;
  Errors503Route: typeof Errors503Route;
  ErrorsComingSoonRoute: typeof ErrorsComingSoonRoute;
}

const rootRouteChildren: RootRouteChildren = {
  AuthorizationRoute: AuthorizationRouteWithChildren,
  OpenapiRoute: OpenapiRoute,
  AuthForgotPasswordRoute: AuthForgotPasswordRoute,
  AuthOtpRoute: AuthOtpRoute,
  AuthSignInRoute: AuthSignInRoute,
  AuthSignIn2Route: AuthSignIn2Route,
  AuthSignUpRoute: AuthSignUpRoute,
  Errors401Route: Errors401Route,
  Errors403Route: Errors403Route,
  Errors404Route: Errors404Route,
  Errors500Route: Errors500Route,
  Errors503Route: Errors503Route,
  ErrorsComingSoonRoute: ErrorsComingSoonRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authorization",
        "/openapi",
        "/(Auth)/forgot-password",
        "/(Auth)/otp",
        "/(Auth)/sign-in",
        "/(Auth)/sign-in-2",
        "/(Auth)/sign-up",
        "/(Errors)/401",
        "/(Errors)/403",
        "/(Errors)/404",
        "/(Errors)/500",
        "/(Errors)/503",
        "/(Errors)/coming-soon"
      ]
    },
    "/_authorization": {
      "filePath": "_authorization.tsx",
      "children": [
        "/_authorization/",
        "/_authorization/dashboard/customers",
        "/_authorization/dashboard/monitor",
        "/_authorization/dashboard/overview",
        "/_authorization/dashboard/products",
        "/_authorization/dashboard/settings",
        "/_authorization/system/permission",
        "/_authorization/system/resource",
        "/_authorization/system/role",
        "/_authorization/system/settings",
        "/_authorization/system/user",
        "/_authorization/apps/",
        "/_authorization/chats/",
        "/_authorization/dashboard/",
        "/_authorization/examples/",
        "/_authorization/tasks/",
        "/_authorization/examples/form/advanced",
        "/_authorization/examples/form/basic",
        "/_authorization/examples/form/simple",
        "/_authorization/examples/form/",
        "/_authorization/examples/list/"
      ]
    },
    "/openapi": {
      "filePath": "openapi.tsx"
    },
    "/(Auth)/forgot-password": {
      "filePath": "(Auth)/forgot-password.tsx"
    },
    "/(Auth)/otp": {
      "filePath": "(Auth)/otp.tsx"
    },
    "/(Auth)/sign-in": {
      "filePath": "(Auth)/sign-in.tsx"
    },
    "/(Auth)/sign-in-2": {
      "filePath": "(Auth)/sign-in-2.tsx"
    },
    "/(Auth)/sign-up": {
      "filePath": "(Auth)/sign-up.tsx"
    },
    "/(Errors)/401": {
      "filePath": "(Errors)/401.tsx"
    },
    "/(Errors)/403": {
      "filePath": "(Errors)/403.tsx"
    },
    "/(Errors)/404": {
      "filePath": "(Errors)/404.tsx"
    },
    "/(Errors)/500": {
      "filePath": "(Errors)/500.tsx"
    },
    "/(Errors)/503": {
      "filePath": "(Errors)/503.tsx"
    },
    "/(Errors)/coming-soon": {
      "filePath": "(Errors)/coming-soon.tsx"
    },
    "/_authorization/": {
      "filePath": "_authorization/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/dashboard/customers": {
      "filePath": "_authorization/dashboard/customers.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/dashboard/monitor": {
      "filePath": "_authorization/dashboard/monitor.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/dashboard/overview": {
      "filePath": "_authorization/dashboard/overview.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/dashboard/products": {
      "filePath": "_authorization/dashboard/products.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/dashboard/settings": {
      "filePath": "_authorization/dashboard/settings.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/system/permission": {
      "filePath": "_authorization/system/permission.lazy.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/system/resource": {
      "filePath": "_authorization/system/resource.lazy.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/system/role": {
      "filePath": "_authorization/system/role.lazy.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/system/settings": {
      "filePath": "_authorization/system/settings.lazy.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/system/user": {
      "filePath": "_authorization/system/user.lazy.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/apps/": {
      "filePath": "_authorization/apps/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/chats/": {
      "filePath": "_authorization/chats/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/dashboard/": {
      "filePath": "_authorization/dashboard/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/examples/": {
      "filePath": "_authorization/examples/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/tasks/": {
      "filePath": "_authorization/tasks/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/examples/form/advanced": {
      "filePath": "_authorization/examples/form/advanced.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/examples/form/basic": {
      "filePath": "_authorization/examples/form/basic.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/examples/form/simple": {
      "filePath": "_authorization/examples/form/simple.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/examples/form/": {
      "filePath": "_authorization/examples/form/index.tsx",
      "parent": "/_authorization"
    },
    "/_authorization/examples/list/": {
      "filePath": "_authorization/examples/list/index.tsx",
      "parent": "/_authorization"
    }
  }
}
ROUTE_MANIFEST_END */
