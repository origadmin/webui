import SignIn2Page from "@/pages/auth/SignIn2";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/sign-in-2")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    const { pathname } = location;
    const urlParams = new URLSearchParams(location.search);
    // This method jumps to the location of the redirect parameter
    const redirectUrl = urlParams.get("redirect");
    if (context.auth.isAuthenticated()) {
      if (redirectUrl !== null || pathname !== "/sign-in-2") {
        throw redirect({ to: redirectUrl || "/sign-in-2" });
      }
    }
  },
});

function RouteComponent() {
  return <SignIn2Page />;
}
