import { useState } from "react";
import { PAGE_SIZE, START_PAGE } from "@/types";
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
interface DataTableQuery {
  page: number;
  pageSize: number;
  sorting?: string;
  filters?: ColumnFiltersState;
}

// Defines the standardized, simple shape of data returned from an API list endpoint.
interface DataTableQueryResult<T> {
  items: T[];
  total: number;
}

// Defines the props for the useDataTable hook.
interface UseDataTableProps<T> {
  useQuery: (params: DataTableQuery) => {
    data?: DataTableQueryResult<T>;
    isLoading: boolean;
  };
  globalFilterKey?: string;
}

export function useDataTable<T>({ useQuery, globalFilterKey }: UseDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: START_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeFilters, setActiveFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading } = useQuery({
    page: pagination.pageIndex, // Using original 'page'
    pageSize: pagination.pageSize, // Using original 'pageSize'
    sorting: formatSorting(sorting),
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
    tableProps,
    searchProps,
  };
}
