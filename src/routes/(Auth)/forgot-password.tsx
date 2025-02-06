import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPasswordPage />;
}
