import { Search } from "@/utils";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function useFilters() {
  const router = useRouter();
  const navigate = useNavigate();
  const search = router.routeTree.useSearch();
  const setFilters = (partialFilters: API.SearchParams) =>
    navigate({
      search: (old) => Search.clean({ ...old, ...partialFilters }) as never,
    });
  const resetFilters = () => navigate({ search: {} as never });

  return { search, setFilters, resetFilters };
}
