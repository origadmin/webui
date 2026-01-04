import ProfilePage from "@/pages/profile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/profile")({
  component: ProfilePage,
});
