import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/form/")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/examples/form") {
      throw redirect({
        to: "/examples/form/basic",
        replace: true,
      });
    }
  },
});
