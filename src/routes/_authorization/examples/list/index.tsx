import ListPage from "@/pages/examples/list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/list/")({
  component: RouteComponent,
});

function RouteComponent() {
  return ListPage();
}
