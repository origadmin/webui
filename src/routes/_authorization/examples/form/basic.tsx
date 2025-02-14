import BasicFormExample from "@/pages/examples/form/basic";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/form/basic")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BasicFormExample />;
}
