import OverviewPage from "@/pages/dashboard/Overview";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  return OverviewPage();
}
