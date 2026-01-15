import React, { useState } from "react";
import { PAGE_SIZE, START_PAGE } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";


// Helper function to format the sorting state for the API
const formatSorting = (sorting: SortingState): string | undefined => {
  if (sorting.length === 0) {
    return undefined;
  }
  const { id, desc } = sorting[0];
  return `${id},${desc ? "desc" : "asc"}`;
};

// Defines the standardized query parameters for any data table.
interface PaginatedQuery {
  page: number;
  pageSize: number;
  sorting?: string;
  [key: string]: unknown; // Allow for additional filter properties
}

// Defines the standardized, simple shape of data returned from an API list endpoint.
export interface PaginatedQueryResult<T> {
  items: T[];
  total: number;
}

// Defines the props for the usePaginatedQuery hook.
interface UsePaginatedQueryProps<T> {
  useQuery: (params: PaginatedQuery, options: { enabled: boolean }) => UseQueryResult<PaginatedQueryResult<T>>;
  globalFilterKey?: string;
}

export type UsePaginatedQueryReturnType<T> = {
  dataSource: T[];
  total: number;
  isLoading: boolean;
  queryResult: UseQueryResult<PaginatedQueryResult<T>>; // Expose the raw query result
  tableProps: {
    paginationState: PaginationState;
    onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>;
    sorting: SortingState;
    onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>;
    columnFiltersState: ColumnFiltersState;
    onColumnFiltersChange: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    globalFilterKey?: string;
    manualSorting: boolean;
  };
  searchProps: {
    onSearch: (filters: ColumnFiltersState) => void;
    onReset: () => void;
  };
};

export function usePaginatedQuery<T>({
  useQuery,
  globalFilterKey,
}: UsePaginatedQueryProps<T>): UsePaginatedQueryReturnType<T> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: START_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeFilters, setActiveFilters] = useState<ColumnFiltersState>([]);

  const queryParams = React.useMemo(() => {
    const params: PaginatedQuery = {
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sorting: formatSorting(sorting),
    };
    activeFilters.forEach((filter) => {
      params[filter.id] = filter.value;
    });
    return params;
  }, [pagination, sorting, activeFilters]);

  const queryResult = useQuery(queryParams, {
    enabled: !!pagination.pageSize, // Only fetch when pageSize is a valid, non-zero number
  });

  const { data, isLoading } = queryResult;

  const handleSearch = (filters: ColumnFiltersState) => {
    setActiveFilters(filters);
    setPagination((prev) => ({ ...prev, pageIndex: START_PAGE }));
  };

  const handleReset = () => {
    setColumnFilters([]);
    setActiveFilters([]);
    setSorting([]);
    setPagination({
      pageIndex: START_PAGE,
      pageSize: PAGE_SIZE,
    });
  };

  const tableProps = {
    paginationState: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
    columnFiltersState: columnFilters,
    onColumnFiltersChange: setColumnFilters,
    globalFilterKey,
    manualSorting: true,
  };

  const searchProps = {
    onSearch: handleSearch,
    onReset: handleReset,
  };

  return {
    dataSource: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    queryResult, // Return the raw query result
    tableProps,
    searchProps,
  };
}
