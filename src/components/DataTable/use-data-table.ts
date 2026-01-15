import { useState } from "react";
import { PAGE_SIZE, START_PAGE } from "@/types";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  OnChangeFn,
} from "@tanstack/react-table";
import { DataTableProps } from ".";


export function useDataTable<TData, TValue>({
  columns,
  dataSource = [],
  total = 0,
  useManual = true,
  paginationState: initialPaginationState = {
    pageSize: PAGE_SIZE,
    pageIndex: START_PAGE,
  },
  columnFiltersState: initialColumnFiltersState = [],
  columnVisibilityState: initialColumnVisibilityState = {},
  expandedState: initialExpandedState = {},
  sorting: initialSorting,
  onSortingChange,
  onColumnFiltersChange,
  onPaginationChange,
  onRowSelectionChange,
  onColumnVisibilityChange,
  onExpandedChange,
  options,
}: Omit<DataTableProps<TData, TValue>, "props" | "isLoading">) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibilityState);
  const [pagination, setPagination] = useState<PaginationState>(initialPaginationState);
  const [sorting, setSorting] = useState<SortingState>(initialSorting || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFiltersState);
  const [expanded, setExpanded] = useState<ExpandedState>(initialExpandedState);

  // Effect to sync initial expanded state from props
  useState(() => {
    setExpanded(initialExpandedState);
  });

  const manualProps = {
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    const newSorting = typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSorting);
    onSortingChange?.(newSorting);
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const newPagination = typeof updater === "function" ? updater(pagination) : updater;
    setPagination(newPagination);
    onPaginationChange?.(newPagination);
  };

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (updater) => {
    const newColumnFilters = typeof updater === "function" ? updater(columnFilters) : updater;
    setColumnFilters(newColumnFilters);
    onColumnFiltersChange?.(newColumnFilters);
  };

  const handleExpandedChange: OnChangeFn<ExpandedState> = (updater) => {
    const newExpanded = typeof updater === "function" ? updater(expanded) : updater;
    setExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  const table = useReactTable({
    ...options,
    data: dataSource,
    columns,
    rowCount: total,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    ...manualProps,
    enableRowSelection: true,
    onRowSelectionChange: onRowSelectionChange || setRowSelection,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onGlobalFilterChange: () => {},
    onColumnVisibilityChange: onColumnVisibilityChange || setColumnVisibility,
    onPaginationChange: useManual ? handlePaginationChange : undefined,
    onExpandedChange: handleExpandedChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: !useManual ? getFilteredRowModel() : undefined,
    getPaginationRowModel: !useManual ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return { table, rowCount: total, columnFilters };
}
