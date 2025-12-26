import { createLazyFileRoute, redirect } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system")({
  loader: async ({ location }) => {
    // If the user is at the exact "/system" path, redirect them to the first child.
    if (location.pathname === "/system") {
      throw redirect({
        to: "/system/user",
      });
    }
    return null; // Otherwise, render the outlet for child routes.
  },
});
