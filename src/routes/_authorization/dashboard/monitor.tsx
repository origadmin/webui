import MonitorPage from "@/pages/dashboard/Monitor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/dashboard/monitor")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MonitorPage />;
}
