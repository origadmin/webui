import ExampleDashboardPage from "@/pages/examples/dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/examples/dashboard")({
  component: ExampleDashboardPage,
});
