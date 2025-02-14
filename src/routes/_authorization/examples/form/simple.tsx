import SimpleFormExample from "@/pages/examples/form/simple";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/form/simple")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SimpleFormExample />;
}
