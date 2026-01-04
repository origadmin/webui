import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/billing")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authorization/billing"!</div>;
}
