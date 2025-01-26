import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Auth)/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Auth)/forgot-password"!</div>;
}
