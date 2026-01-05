import { useState } from "react";
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { PAGE_SIZE, START_PAGE } from "@/types";

// Defines the standardized query parameters for any data table.
interface DataTableQuery {
  page: number;
  pageSize: number;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
}

// Defines the standardized, simple shape of data returned from an API list endpoint.
// This now includes pagination info returned from the server.
interface DataTableQueryResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Defines the props for the useDataTable hook.
interface UseDataTableProps<T> {
  // The query hook's result must be wrapped in a `data` property by React Query.
  // The value of that `data` property must be our standardized result shape.
  useQuery: (params: DataTableQuery) => {
    data?: DataTableQueryResult<T>;
    isLoading: boolean;
  };
  globalFilterKey?: string;
}

/**
 * A custom hook to manage the state and data fetching for a data table.
 * It enforces a consistent data structure from the API layer.
 *
 * @param useQuery The React Query hook used to fetch data. The hook must return an object
 *                 containing `{ data: T[], total: number, page: number, pageSize: number }`.
 * @returns An object containing dataSource, total, loading state, and spreadable props for the DataTable.
 */
export function useDataTable<T>({
  useQuery,
  globalFilterKey,
}: UseDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: START_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeFilters, setActiveFilters] = useState<ColumnFiltersState>([]);

  // `data` from useQuery will be the { data, total, page, pageSize } object.
  const { data, isLoading } = useQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting: sorting,
    filters: activeFilters,
  });

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
  };

  const searchProps = {
    onSearch: handleSearch,
    onReset: handleReset,
  };

  return {
    dataSource: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    tableProps,
    searchProps,
  };
}
