import OtpPage from "@/pages/auth/Otp";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/otp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OtpPage />;
}
