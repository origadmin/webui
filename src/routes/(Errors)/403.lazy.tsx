import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/403")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Errors)/forbidden-error"!</div>;
}
