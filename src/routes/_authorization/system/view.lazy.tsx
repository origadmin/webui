import { createLazyFileRoute } from "@tanstack/react-router";
import ViewPage from "@/pages/system/view";

export const Route = createLazyFileRoute("/_authorization/system/view")({
  component: ViewPage,
});
