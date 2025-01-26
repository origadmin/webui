import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/app/MainLayout";

export const Route = createFileRoute("/_authorization")({
  component: RouteComponent,
});

function RouteComponent() {
  return MainLayout();
}
