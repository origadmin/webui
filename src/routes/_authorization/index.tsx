import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({
        to: "/dashboard/overview",
        replace: true,
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
