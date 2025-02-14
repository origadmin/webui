import SettingsPage from "@/pages/system/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/system/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsPage />;
}
