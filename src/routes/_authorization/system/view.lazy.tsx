import ViewPage from "@/pages/system/view";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/view")({
  component: ViewPage,
});
