import { SIGN_IN_URL, DEFAULT_MAIN_PAGE } from "@/types";
import { redirect, createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated()) {
      throw redirect({
        to: SIGN_IN_URL,
        search: {
          redirect: location.href,
        },
      });
    }
    throw redirect({
      to: DEFAULT_MAIN_PAGE,
      replace: true,
    });
  },
});

function RouteComponent() {
  return <Outlet />;
}
