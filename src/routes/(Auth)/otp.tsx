import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/otp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Auth)/otp"!</div>;
}
