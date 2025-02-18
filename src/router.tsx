import { InternalServerError, NotFoundError } from "@/pages/errors";
import { refreshToken } from "@/utils/auth";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes.gen";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error.response?.status === 500 && failureCount < 2) {
          try {
            const resp = refreshToken();
            console.log("Token refreshed successfully");
            return resp !== undefined; // Retry the query
          } catch (refreshError) {
            console.error("Refresh token failed", refreshError);
            return false; // Don't retry if refresh failed
          }
        }
        return false; // Don't retry for other errors
      },
    },
  },
});

// NOTE: Most of the integration code found here is experimental and will
// definitely end up in a more streamlined API in the future. This is just
// to show what's possible with the current APIs.
export const router = createRouter({
  routeTree,
  context: { queryClient, auth: undefined! },
  // parseSearch: parseSearchWith((value) => decodeFromBinary(value)),
  // stringifySearch: stringifySearchWith((value) => encodeToBinary(value)),
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
