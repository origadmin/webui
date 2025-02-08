import OpenApiPage from "@/pages/openapi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/openapi")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OpenApiPage />;
}
