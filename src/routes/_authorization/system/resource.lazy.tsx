import ResourcesPage from "@/pages/system/resource";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/resource")({
  // loader: async (ctx) => {
  //   const { deps, context } = ctx;
  //   const { queryClient } = context;
  //   console.log("ctx", ctx, "deps: ", deps);
  //   return queryClient.ensureQueryData(rolesQueryOptions(deps));
  // },
  // loaderDeps: ({ search }) => Search.parseParams(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <ResourcesPage />;
}
