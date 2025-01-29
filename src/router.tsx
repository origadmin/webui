import { InternalServerError, NotFoundError } from "@/pages/errors";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routes.gen";

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.

export function createRouter() {
  const queryClient = new QueryClient();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: { queryClient, auth: undefined! },
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
      defaultErrorComponent: InternalServerError,
      defaultNotFoundComponent: NotFoundError,
    }),
    queryClient,
  );
}

export const router = createRouter();

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
