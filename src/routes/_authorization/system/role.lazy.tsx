import RolePage from "@/pages/system/role";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/role")({
  component: RouteComponent,
});

function RouteComponent() {
  return RolePage();
}
