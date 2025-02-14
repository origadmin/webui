import OverviewPage from "@/pages/dashboard/Overview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/dashboard/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OverviewPage />;
}
