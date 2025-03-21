import BasicPage from "@/pages/examples/basic";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/basic/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BasicPage />;
}
