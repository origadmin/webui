import { ForbiddenError } from "@/pages/errors";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/403")({
  component: RouteComponent,
});

function RouteComponent() {
  return ForbiddenError();
}
