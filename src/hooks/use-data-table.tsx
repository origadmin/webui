import { useEffect, useState } from "react";
import { Search } from "@/utils/index";
import { PaginationState, SortingState, Updater, ColumnFiltersState, OnChangeFn } from "@tanstack/react-table";
import { useFilters } from "@/hooks/use-filters";

export interface ReturnType<T> {
  data: T;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
}

export interface UseDataTableProps<T> {
  useQuery: (search: API.SearchParams) => Partial<ReturnType<API.Result<T>>>;
}

export interface UseDataTableReturn<T> {
  sorting: SortingState;
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  params: API.SearchParams;
  isLoading: boolean;
  data: API.Result<T>;
  setSorting: (updaterOrValue: Updater<SortingState>) => void;
  setPagination: (updaterOrValue: Updater<PaginationState>) => void;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  handleSearch: (filters: ColumnFiltersState) => void;
  handleReset: () => void;
}

export function useDataTable<T extends object>({ useQuery }: UseDataTableProps<T>): UseDataTableReturn<T> {
  const { search, setFilters, resetFilters } = useFilters();
  const oldFilters = Search.getColumnFilters(search);
  const [sorting, _setSorting] = useState(Search.getSorting(search));
  const [pagination, _setPagination] = useState(Search.getPagination(search));
  const [columnFilters, _setColumnFilters] = useState(oldFilters);
  const [searching, setSearching] = useState(false);
  const [params, setParams] = useState<API.SearchParams>(
    Search.parse({
      pagination,
      sorting,
      columnFilters,
    }),
  );

  useEffect(() => {
    if (!searching) return;
    setSearching(false);
    setParams(
      Search.parse({
        pagination,
        sorting,
        columnFilters,
      }),
    );
  }, [searching, pagination, sorting, columnFilters]);
  const setSorting = (updaterOrValue: Updater<SortingState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue;
    _setSorting(state);
    setFilters({
      ...params,
      ...Search.parseSorting(state),
    });
    setSearching(true);
  };

  const setPagination = (updaterOrValue: Updater<PaginationState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;
    _setPagination(state);
    setFilters({
      ...params,
      ...Search.parsePagination(state),
    });
    setSearching(true);
  };

  const setColumnFilters = (updaterOrValue: Updater<ColumnFiltersState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(columnFilters) : updaterOrValue;
    _setColumnFilters(state);
  };

  console.log("query", params);
  const { data = {}, isLoading } = useQuery(params);

  const handleReset = async () => {
    setSearching(true);
    resetFilters();
  };

  const handleSearch = async (filters: ColumnFiltersState) => {
    setSearching(true);
    setFilters({
      ...params,
      ...Search.parseColumnFilters(filters),
      current: 1,
    });
  };

  return {
    sorting,
    pagination,
    columnFilters,
    params,
    isLoading: isLoading || false,
    data,
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  };
}
