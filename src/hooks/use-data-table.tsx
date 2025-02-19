import { useState, useEffect } from "react";
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
  // total: number;
  setSorting: (updaterOrValue: Updater<SortingState>) => void;
  setPagination: (updaterOrValue: Updater<PaginationState>) => void;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  handleSearch: (filters: ColumnFiltersState) => void;
  handleReset: () => void;
}

export function useDataTable<T extends object>(props: UseDataTableProps<T>): UseDataTableReturn<T> {
  const { search, setFilters, resetFilters } = useFilters();
  const sorting = Search.getSorting(search);
  const pagination = Search.getPagination(search);
  const columnFilters = Search.getColumnFilters(search);
  const [updating, setUpdating] = useState(false);
  const [params, setParams] = useState<API.SearchParams>(
    Search.parse({
      pagination,
      sorting,
      columnFilters,
    }),
  );

  const setSorting = (updaterOrValue: Updater<SortingState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue;
    setParams({
      ...params,
      ...Search.parseSorting(state),
    });
    setUpdating(true);
  };

  const setPagination = (updaterOrValue: Updater<PaginationState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;
    setParams({
      ...params,
      ...Search.parsePagination(state),
    });
    setUpdating(true);
  };

  const setColumnFilters = (updaterOrValue: Updater<ColumnFiltersState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(columnFilters) : updaterOrValue;
    setParams({
      ...params,
      ...Search.parseColumnFilters(state),
    });
  };

  const { data = {}, isLoading } = props.useQuery(params);

  useEffect(() => {
    if (updating) {
      setFilters(params);
      setUpdating(false);
    }
  }, [params, setFilters, updating]);

  const handleSearch = (filters: ColumnFiltersState) => {
    setColumnFilters(filters);
    setParams({
      ...params,
      ...Search.parseColumnFilters(filters),
      current: 1,
    });
    setUpdating(true);
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
    handleReset: resetFilters,
  };
}
