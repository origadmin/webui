import { GeneralError, NotFoundError, errorRoutes } from "@/pages/errors";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

type RouteObjectConfig = RouteObject & {
  keyword?: string;
};

type RouterConfig = RouteObjectConfig[];

export const routes: RouterConfig = [
  // Auth routes
  {
    path: "/login",
    lazy: async () => ({
      Component: (await import("@/pages/login")).default,
    }),
  },
  {
    path: "/sign-in",
    lazy: async () => ({
      Component: (await import("@/pages/auth/sign-in")).default,
    }),
  },
  {
    path: "/sign-in-2",
    lazy: async () => ({
      Component: (await import("@/pages/auth/sign-in-2")).default,
    }),
  },
  {
    path: "/sign-up",
    lazy: async () => ({
      Component: (await import("@/pages/auth/sign-up")).default,
    }),
  },
  {
    path: "/forgot-password",
    lazy: async () => ({
      Component: (await import("@/pages/auth/forgot-password")).default,
    }),
  },
  {
    path: "/otp",
    lazy: async () => ({
      Component: (await import("@/pages/auth/otp")).default,
    }),
  },
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const MainPage = await import("@/app/MainPage");
      return { Component: MainPage.default };
    },
    children: [
      {
        index: true,
        element: <Navigate to='dashboard' replace />,
      },
      {
        path: "dashboard",
        lazy: async () => ({
          Component: (await import("@/pages/dashboard")).default,
          metadata: {
            hidden: true,
            title: "Dashboard",
            icon: "dashboard",
          },
        }),
      },
      {
        index: true,
        path: "monitor",
        lazy: async () => ({
          Component: (await import("@/pages/monitor")).default,
          metadata: {
            hidden: true,
            title: "Monitor",
            icon: "monitor",
          },
        }),
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
              Component: (await import("@/pages/system/user")).default,
              metadata: {
                title: "User",
                icon: "user",
              },
            }),
          },
          {
            index: true,
            path: "settings",
            lazy: async () => ({
              Component: (await import("@/pages/system/settings")).default,
              metadata: {
                title: "Settings",
                icon: "settings",
              },
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
                  metadata: {
                    title: "Basic Form",
                    icon: "form",
                  },
                }),
              },
              {
                path: "simple",
                lazy: async () => ({
                  Component: (await import("@/pages/examples/form/simple")).default,
                  metadata: {
                    title: "Detailed Form",
                    icon: "form",
                  },
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
          metadata: {
            title: "Tasks",
            icon: "tasks",
          },
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
        errorElement: <GeneralError />,
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
            errorElement: <GeneralError className='h-[50svh]' minimal />,
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

const router = createBrowserRouter(routes);

export default router;
