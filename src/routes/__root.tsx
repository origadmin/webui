import * as React from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContextType } from "@/hooks/use-auth";

export const Route = createRootRouteWithContext<{
  auth: AuthContextType;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      {import.meta.env.MODE === "development" && (
        <>
          {/*<ReactQueryDevtools buttonPosition='bottom-left' />*/}
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </React.Fragment>
  );
}
