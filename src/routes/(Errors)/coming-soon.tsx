import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Errors)/coming-soon")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(Errors)/coming-soon"!</div>;
}
