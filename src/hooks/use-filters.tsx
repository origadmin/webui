import { Search } from "@/utils";
import { useRouter } from "@tanstack/react-router";

export function useFilters() {
  const { routeTree, navigate } = useRouter();
  const search = routeTree.useSearch();
  const setFilters = (partialFilters: API.SearchParams) =>
    navigate({
      search: (old) => Search.clean({ ...old, ...partialFilters }) as never,
    });
  const resetFilters = () => navigate({ search: {} as never });

  return { search, setFilters, resetFilters };
}
