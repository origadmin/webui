import RolesPage from "@/pages/system/role";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/system/role")({
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
  return <RolesPage />;
}
