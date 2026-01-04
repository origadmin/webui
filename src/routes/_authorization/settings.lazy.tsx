import UserSettingsPage from "@/pages/settings";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/settings")({
  component: UserSettingsPage,
});
