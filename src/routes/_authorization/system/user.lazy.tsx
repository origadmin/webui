import UserPage from "@/pages/system/user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/user")({
  component: RouteComponent,
});

function RouteComponent() {
  return UserPage();
}
