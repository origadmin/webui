import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/system/user")({
  // loader: async (ctx) => {
  //   const { deps, context } = ctx;
  //   const { queryClient } = context;
  //   return queryClient.ensureQueryData(usersQueryOptions(deps));
  // },
  // loaderDeps: ({ search }) => Search.parseParams(search),
  // component: RouteComponent,
});
