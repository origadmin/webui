import GeneralError from "@/pages/errors/general-error";
import MaintenanceError from "@/pages/errors/maintenance-error";
import NotFoundError from "@/pages/errors/not-found-error";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

type RouterConfig = RouteObject & {
  keyword?: string,
};

export const routes: RouterConfig[] = [
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
    element: <Navigate to='/dashboard' replace />,
    children: [
      {
        index: true,
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
              // 添加默认重定向到 'basic'
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
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
];

const router = createBrowserRouter(routes);

export default router;
