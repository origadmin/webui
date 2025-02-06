import SignUpPage from "@/pages/auth/SignUp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpPage />;
}
