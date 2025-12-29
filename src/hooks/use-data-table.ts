import { useState } from "react";
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { PAGE_SIZE, START_PAGE } from "@/types";

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
}

/**
 * A custom hook to manage the state and data fetching for a data table.
 * It now returns a `tableProps` object that can be spread directly
 * onto the DataTable component for cleaner usage.
 *
 * @param useQuery The React Query hook used to fetch data.
 * @returns An object containing data, loading state, and spreadable tableProps.
 */
export function useDataTable<T>({ useQuery }: UseDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: START_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    sorting: sorting,
    filters: columnFilters,
  });

  const handleSearch = (filters: ColumnFiltersState) => {
    setColumnFilters(filters);
    setPagination((prev) => ({ ...prev, pageIndex: START_PAGE }));
  };

  const handleReset = () => {
    setColumnFilters([]);
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
    columnFiltersState: columnFilters,
    onColumnFiltersChange: setColumnFilters,
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
