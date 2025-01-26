import MonitorPage from "@/pages/dashboard/Monitor";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/monitor")({
  component: RouteComponent,
});

function RouteComponent() {
  return MonitorPage();
}
