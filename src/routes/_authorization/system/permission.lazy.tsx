import PermissionPage from "@/pages/system/permission";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/permission")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PermissionPage />;
}
