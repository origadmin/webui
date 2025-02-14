import { createFileRoute } from "@tanstack/react-router";
import ServiceTemporarilyUnavailableError from "src/pages/errors/service-temporarily-unavailable-error";

export const Route = createFileRoute("/(Errors)/503")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ServiceTemporarilyUnavailableError />;
}
