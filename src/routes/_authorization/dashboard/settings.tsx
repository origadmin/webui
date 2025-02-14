import SettingsPage from "@/pages/dashboard/Settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsPage />;
}
