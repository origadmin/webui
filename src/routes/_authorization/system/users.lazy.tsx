import UsersPage from "@/pages/system/users";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return UsersPage();
}
