import PermissionPage from "@/pages/system/role/components/permission-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/system/permission")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PermissionPage />;
}
