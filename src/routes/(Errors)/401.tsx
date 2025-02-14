import { UnauthorizedError } from "@/pages/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Errors)/401")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UnauthorizedError />;
}
