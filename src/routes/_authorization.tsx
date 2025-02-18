import MainLayout from "@/layout/layout";
import { SIGN_IN_URL } from "@/types";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    console.log("location", location, "auth", context.auth.isAuthenticated());
    if (!context.auth.isAuthenticated()) {
      throw redirect({
        to: SIGN_IN_URL,
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <MainLayout />;
}
