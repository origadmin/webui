import { ForbiddenError } from "@/pages/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Errors)/403")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForbiddenError />;
}
