import { listUser } from "@/api/system/user";
import UserPage from "@/pages/system/user";
import { Search } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authorization/system/user")({
  loader: async ({ deps }) => {
    console.log("deps: ", deps);
    return await listUser({ ...deps, _loader: true });
  },
  loaderDeps: ({ search }) => Search.parseParams(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <UserPage />;
}
