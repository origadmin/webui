import MainLayout from "@/layout/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout />;
}
