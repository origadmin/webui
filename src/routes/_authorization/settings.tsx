import UserSettingsPage from "@/pages/settings";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/settings")({
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <UserSettingsPage>
      <Outlet />
    </UserSettingsPage>
  );
}
