import { redirect, createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated()) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }
    throw redirect({
      to: "/dashboard",
      replace: true,
    });
  },
});

function RouteComponent() {
  return <Outlet />;
}
