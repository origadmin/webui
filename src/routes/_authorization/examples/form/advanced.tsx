import AdvancedFormExample from "@/pages/examples/form/advanced";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/form/advanced")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AdvancedFormExample />;
}
