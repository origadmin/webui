import AnalyticsPage from "@/pages/dashboard/analytics";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/dashboard/analytics")({
  component: AnalyticsPage,
});
