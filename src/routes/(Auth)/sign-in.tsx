import SignInPage from "@/pages/auth/SignIn";
import { SIGN_IN_URL } from "@/types";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/sign-in")({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    const { pathname } = location;
    const urlParams = new URLSearchParams(location.search);
    // This method jumps to the location of the redirect parameter
    const redirectUrl = urlParams.get("redirect");
    if (context.auth.isAuthenticated()) {
      if (redirectUrl !== null || pathname !== SIGN_IN_URL) {
        throw redirect({ to: redirectUrl || SIGN_IN_URL });
      }
    }
  },
});

function RouteComponent() {
  return <SignInPage />;
}
