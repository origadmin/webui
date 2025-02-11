import { InternalServerError, NotFoundError } from "@/pages/errors";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes.gen";

export const queryClient = new QueryClient();

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.
export const router = createRouter({
  routeTree,
  // defaultPendingComponent: () => (
  //   <div className={`p-2 text-2xl`}>
  //     <Spinner />
  //   </div>
  // ),
  // defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: { queryClient, auth: undefined! },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: InternalServerError,
  defaultNotFoundComponent: NotFoundError,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
