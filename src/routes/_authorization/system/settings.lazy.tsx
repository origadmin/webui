import SettingsPage from "@/pages/system/settings";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsPage />;
}
