import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/dashboard/")({
  component: RouteComponent,
  beforeLoad: () => {
    console.log("beforeLoad");
    throw redirect({
      to: "/dashboard/overview",
      replace: true,
    });
  },
});

function RouteComponent() {
  return <div>Hello "/_authrization/dashboard/"!</div>;
}
