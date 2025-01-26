import AdvancedFormExample from "@/pages/examples/form/advanced";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/examples/form/advanced")({
  component: RouteComponent,
});

function RouteComponent() {
  return AdvancedFormExample();
}
