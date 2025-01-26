import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/404")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Errors)/not-found-error"!</div>;
}
