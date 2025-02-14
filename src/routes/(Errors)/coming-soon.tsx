import { ComingSoon } from "@/pages/errors";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(Errors)/coming-soon")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoon />;
}
