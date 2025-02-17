import UserPage from "@/pages/system/user";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_authorization/system/user")({
  // loader: async (ctx) => {
  //   const { deps, context } = ctx;
  //   const { queryClient } = context;
  //   console.log("ctx", ctx, "deps: ", deps);
  //   return queryClient.ensureQueryData(usersQueryOptions(deps));
  // },
  // loaderDeps: ({ search }) => Search.parseParams(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <UserPage />;
}
