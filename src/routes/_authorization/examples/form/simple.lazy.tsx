import SimpleFormExample from "@/pages/examples/form/simple";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/examples/form/simple")({
  component: RouteComponent,
});

function RouteComponent() {
  return SimpleFormExample();
}
