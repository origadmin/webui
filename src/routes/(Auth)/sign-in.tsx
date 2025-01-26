import SignInPage from "@/pages/auth/SignIn";
import { SIGN_IN_URL } from "@/types";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/sign-in")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const { pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirectUrl = urlParams.get("redirect");
    if (context.auth.isAuthenticated()) {
      if (redirectUrl !== null || pathname !== SIGN_IN_URL) {
        throw redirect({ to: redirectUrl || SIGN_IN_URL });
      }
    }
  },
});

function RouteComponent() {
  return SignInPage();
}
