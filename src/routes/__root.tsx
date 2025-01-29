import { Fragment } from "react";
import { InternalServerError, NotFoundError } from "@/pages/errors";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContextType } from "@/hooks/use-auth";

export const Route = createRootRouteWithContext<{
  auth: AuthContextType;
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  errorComponent: InternalServerError,
  notFoundComponent: NotFoundError,
});

function RootComponent() {
  return (
    <Fragment>
      <Outlet />
      {import.meta.env.MODE === "development" && (
        <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </>
      )}
    </Fragment>
  );
}
