import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/503")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Errors)/maintenance-error"!</div>;
}
