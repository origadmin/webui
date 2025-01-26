import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes.gen";

// export function createRouter() {
//   const queryClient = new QueryClient()
//
//   return routerWithQueryClient(
//     createTanStackRouter({
//       routeTree,
//       context: { queryClient },
//       defaultPreload: 'intent',
//       defaultErrorComponent: DefaultCatchBoundary,
//       defaultNotFoundComponent: () => <NotFound />,
//     }),
//     queryClient,
//   )
// }

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
