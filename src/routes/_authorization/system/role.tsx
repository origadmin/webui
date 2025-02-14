import RolesPage from "@/pages/system/role";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/system/role")({
  loader: async () => {
    return {
      title: "Role Management",
      description: "Manage roles and permissions.",
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <RolesPage />;
}
