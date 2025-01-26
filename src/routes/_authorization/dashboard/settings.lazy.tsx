import SettingsPage from "@/pages/dashboard/Settings";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return SettingsPage();
}
