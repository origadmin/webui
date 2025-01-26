import AppsPage from "@/pages/apps";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/apps/")({
  component: RouteComponent,
});

function RouteComponent() {
  return AppsPage();
}
