import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/500")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Errors)/internal-server-error"!</div>;
}
