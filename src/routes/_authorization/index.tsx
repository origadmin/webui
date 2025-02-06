import { DEFAULT_MAIN_PAGE, SIGN_IN_URL } from "@/types";
import { redirect, createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    console.log("location", location);
    if (context.auth.isAuthenticated()) {
      throw redirect({
        to: DEFAULT_MAIN_PAGE,
        replace: true,
      });
    }
    throw redirect({
      to: SIGN_IN_URL,
      search: {
        redirect: location.href,
      },
    });
  },
});

function RouteComponent() {
  return <Outlet />;
}
