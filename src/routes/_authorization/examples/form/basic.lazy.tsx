import BasicFormExample from "@/pages/examples/form/basic";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/examples/form/basic")({
  component: RouteComponent,
});

function RouteComponent() {
  return BasicFormExample();
}
