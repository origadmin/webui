import ResourcesPage from "@/pages/system/resource";
import { createLazyFileRoute } from "@tanstack/react-router";


export const Route = createLazyFileRoute("/_authorization/system/resource")({
  component: ResourcesPage,
});
