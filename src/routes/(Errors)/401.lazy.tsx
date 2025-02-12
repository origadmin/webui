import { UnauthorizedError } from "@/pages/errors";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(Errors)/401")({
  component: RouteComponent,
});

function RouteComponent() {
  return UnauthorizedError();
}
