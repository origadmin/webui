import AppsPage from "@/pages/apps";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/apps/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppsPage />;
}
