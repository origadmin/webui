import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/settings/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authorization/settings/notifications"!</div>;
}
