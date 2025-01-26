import { createLazyFileRoute } from "@tanstack/react-router";
import UserPage from "@/pages/system/user";

export const Route = createLazyFileRoute("/_authorization/system/user")({
  component: RouteComponent,
});

function RouteComponent() {
  return UserPage();
}
