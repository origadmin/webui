import { InternalServerError } from "@/pages/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Errors)/500")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InternalServerError />;
}
