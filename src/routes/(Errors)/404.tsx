import { NotFoundError } from "@/pages/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Errors)/404")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFoundError />;
}
