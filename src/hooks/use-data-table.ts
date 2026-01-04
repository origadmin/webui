import { useState } from "react";
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { PAGE_SIZE, START_PAGE } from "@/types";
import { DataTableProps } from "@/components/DataTable";

// (Interfaces remain the same)
interface DataTableQuery {
  page: number;
  pageSize: number;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
}

interface QueryResult<T> {
  data?: {
    data?: T[];
    total?: number;
  };
  isLoading: boolean;
}

interface UseDataTableProps<T> {
  useQuery: (params: DataTableQuery) => QueryResult<T>;
  globalFilterKey?: string;
}

/**
 * A custom hook to manage the state and data fetching for a data table.
 * It now returns a `tableProps` object that can be spread directly
 * onto the DataTable component for cleaner usage.
 *
 * It implements manual search by separating the live column filters
 * (for input state) from the active filters (used for the query).
 *
 * @param useQuery The React Query hook used to fetch data.
 * @returns An object containing data, loading state, and spreadable tableProps.
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
  // Live filters for input state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // Active filters for the query
  const [activeFilters, setActiveFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting: sorting,
    filters: activeFilters, // Use active filters for the query
  });

  const handleSearch = (filters: ColumnFiltersState) => {
    // When search is clicked, apply the live filters to the active filters
    setActiveFilters(filters);
    setPagination((prev) => ({ ...prev, pageIndex: START_PAGE }));
  };

  const handleReset = () => {
    // Reset both live and active filters
    setColumnFilters([]);
    setActiveFilters([]);
    setSorting([]);
    setPagination({
      pageIndex: START_PAGE,
      pageSize: PAGE_SIZE,
    });
  };

  // Group state and handlers into a spreadable object
  const tableProps = {
    paginationState: pagination,
    onPaginationChange: setPagination,
    sorting: sorting,
    onSortingChange: setSorting,
    columnFiltersState: columnFilters, // Pass live filters to the table for input control
    onColumnFiltersChange: setColumnFilters,
    globalFilterKey,
  };

  // Group search handlers for the search sub-component
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
