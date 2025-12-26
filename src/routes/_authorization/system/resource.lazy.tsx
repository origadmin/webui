import { createLazyFileRoute } from "@tanstack/react-router";
import ResourcesPage from "@/pages/system/resource";

export const Route = createLazyFileRoute("/_authorization/system/resource")({
  component: ResourcesPage,
});
