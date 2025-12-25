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

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!, // The auth context is now provided by the root route
  },
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
