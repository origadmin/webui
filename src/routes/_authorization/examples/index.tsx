import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/examples/")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/examples") {
      throw redirect({
        to: "/examples/form/basic",
        replace: true,
      });
    }
  },
});
