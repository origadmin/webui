import { InternalServerError } from "@/pages/errors";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/500")({
  component: RouteComponent,
});

function RouteComponent() {
  return InternalServerError({});
}
