import { InternalServerError, NotFoundError } from "@/pages/errors";
import { failureRetry } from "@/utils/auth";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes.gen";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: failureRetry,
    },
  },
});

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.
export const router = createRouter({
  routeTree,
  context: { queryClient, auth: undefined! },
  // stringifySearch: stringifySearchWith(Search.stringifySearch),
  // parseSearch: parseSearchWith(Search.parseSearch),
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
