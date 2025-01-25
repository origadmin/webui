import { InternalServerError, NotFoundError, errorRoutes } from "@/pages/errors";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

export type RouterConfig = RouteObject[];

export const routes: RouterConfig = [
  // Auth routes
  {
    id: "sign-in",
    path: "/sign-in",
    lazy: async () => ({
      Component: (await import("@/pages/auth/SignIn")).default,
    }),
  },
  {
    id: "sign-in-2",
    path: "/sign-in-2",
    lazy: async () => ({
      Component: (await import("@/pages/auth/SignIn2")).default,
    }),
  },
  {
    id: "sign-up",
    path: "/sign-up",
    lazy: async () => ({
      Component: (await import("@/pages/auth/SignUp")).default,
    }),
  },
  {
    id: "forgot-password",
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("@/pages/auth/ForgotPassword")).default,
    }),
  },
  {
    id: "otp",
    path: "/otp",
    lazy: async () => ({
      Component: (await import("@/pages/auth/Otp")).default,
    }),
  },
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const MainLayout = await import("@/app/MainLayout");
      return { Component: MainLayout.default };
    },
    children: [
      {
        index: true,
        element: <Navigate to='dashboard/overview' replace />,
      },
      {
        id: "dashboard",
        path: "dashboard",
        children: [
          {
            index: true,
            element: <Navigate to='overview' replace />,
          },
          {
            id: "dashboard:overview",
            path: "overview",
            lazy: async () => ({
              Component: (await import("@/pages/dashboard/Overview")).default,
            }),
          },
          {
            id: "dashboard:monitor",
            path: "monitor",
            lazy: async () => ({
              Component: (await import("@/pages/dashboard/Monitor")).default,
            }),
          },
          {
            id: "dashboard:customers",
            path: "customers",
            lazy: async () => ({
              Component: (await import("@/pages/dashboard/Customers")).default,
            }),
          },
          {
            id: "dashboard:products",
            path: "products",
            lazy: async () => ({
              Component: (await import("@/pages/dashboard/Products")).default,
            }),
          },
          {
            id: "dashboard:settings",
            path: "settings",
            lazy: async () => ({
              Component: (await import("@/pages/dashboard/Settings")).default,
            }),
          },
        ],
      },
      {
        path: "system",
        children: [
          {
            index: true,
            element: <Navigate to='user' replace />,
          },
          {
            path: "user",
            lazy: async () => ({
              Component: (await import("@/pages/system/users")).default,
            }),
          },
          {
            path: "user2",
            lazy: async () => ({
              Component: (await import("@/pages/system/user")).default,
            }),
          },
          {
            index: true,
            path: "settings",
            lazy: async () => ({
              Component: (await import("@/pages/system/settings")).default,
            }),
          },
          // {
          //   path: "role",
          //   lazy: async () => ({
          //     Component: (await import("@/pages/system/role")).default,
          //   }),
          // },
          // {
          //   path: "menu",
          //   lazy: async () => ({
          //     Component: (await import("@/pages/system/menu")).default,
          //   }),
          // },
          // {
          //   path: "resource",
          //   lazy: async () => ({
          //     Component: (await import("@/pages/system/resource")).default,
          //   }),
          // },
          // {
          //   path: "team",
          //   lazy: async () => ({
          //     Component: (await import("@/pages/system/team")).default,
          //   }),
          // },
          // {
          //   path: "permission",
          //   lazy: async () => ({
          //     Component: (await import("@/pages/system/permission")).default,
          //   }),
          // },
        ],
      },
      {
        path: "examples",
        children: [
          {
            index: true,
            path: "list",
            lazy: async () => ({
              Component: (await import("@/pages/examples/list")).default,
            }),
          },
          {
            path: "form",
            children: [
              {
                index: true,
                element: <Navigate to='basic' replace />,
              },
              {
                path: "basic",
                lazy: async () => ({
                  Component: (await import("@/pages/examples/form/basic")).default,
                }),
              },
              {
                path: "simple",
                lazy: async () => ({
                  Component: (await import("@/pages/examples/form/simple")).default,
                }),
              },
              {
                path: "advanced",
                lazy: async () => ({
                  Component: (await import("@/pages/examples/form/advanced")).default,
                }),
              },
            ],
          },
        ],
      },
      {
        path: "tasks",
        lazy: async () => ({
          Component: (await import("@/pages/tasks")).default,
        }),
      },
      {
        path: "chats",
        lazy: async () => ({
          Component: (await import("@/pages/errors/coming-soon")).default,
        }),
      },
      {
        path: "apps",
        lazy: async () => ({
          Component: (await import("@/pages/apps")).default,
        }),
      },
      {
        path: "users",
        lazy: async () => ({
          Component: (await import("@/pages/errors/coming-soon")).default,
        }),
      },
      {
        path: "analysis",
        lazy: async () => ({
          Component: (await import("@/pages/errors/coming-soon")).default,
        }),
      },
      {
        path: "extra-components",
        lazy: async () => ({
          Component: (await import("@/pages/extra-components")).default,
        }),
      },
      {
        path: "settings",
        lazy: async () => ({
          Component: (await import("@/pages/settings")).default,
        }),
        errorElement: <InternalServerError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("@/pages/settings/profile")).default,
            }),
          },
          {
            path: "account",
            lazy: async () => ({
              Component: (await import("@/pages/settings/account")).default,
            }),
          },
          {
            path: "appearance",
            lazy: async () => ({
              Component: (await import("@/pages/settings/appearance")).default,
            }),
          },
          {
            path: "notifications",
            lazy: async () => ({
              Component: (await import("@/pages/settings/notifications")).default,
            }),
          },
          {
            path: "display",
            lazy: async () => ({
              Component: (await import("@/pages/settings/display")).default,
            }),
          },
          {
            path: "error-example",
            lazy: async () => ({
              Component: (await import("@/pages/settings/error-example")).default,
            }),
            errorElement: <InternalServerError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },
  // Error routes
  // { path: "/500", Component: GeneralError },
  // { path: "/404", Component: NotFoundError },
  // { path: "/503", Component: MaintenanceError },
  // { path: "/401", Component: UnauthorizedError },
  ...errorRoutes,
  // Fallback 404 route
  { path: "*", Component: NotFoundError },
];

// const getRoutes: {
//   routes: RouterConfig;
//   routeComponents: Map<string, React.LazyExoticComponent<() => JSX.Element>>;
// } = async () => {
//   return {
//     routes,
//     routeComponents: {
//       "/sign-in": lazy(() => import("@/pages/auth/SignIn")),
//       "/sign-up": lazy(() => import("@/pages/auth/SignUp")),
//       "/forgot-password": lazy(() => import("@/pages/auth/ForgotPassword")),
//       "/sign-in-2": lazy(() => import("@/pages/auth/SignIn2")),
//       "/maintenance": lazy(() => import("@/pages/errors/maintenance-error")),
//     },
//   };
// };

const router = createBrowserRouter(routes);

export default router;
