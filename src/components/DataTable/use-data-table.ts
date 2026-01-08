import { useState, useEffect } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  OnChangeFn,
  TableOptions,
} from "@tanstack/react-table";
import { PAGE_SIZE, START_PAGE } from "@/types";
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
  columnVisibilityState: initialColumnVisibilityState = {}, // New prop for initial visibility
  sorting: initialSorting,
  onSortingChange,
  onColumnFiltersChange,
  onPaginationChange,
  onRowSelectionChange,
  onColumnVisibilityChange,
  options,
  isLoading,
}: Omit<DataTableProps<TData, TValue>, "props">) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibilityState); // Use the new prop
  const [data, setData] = useState<TData[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] =
    useState<PaginationState>(initialPaginationState);
  const [sorting, setSorting] = useState<SortingState>(initialSorting || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialColumnFiltersState
  );

  useEffect(() => {
    if (isLoading) return;
    if (!dataSource || !total) return;
    setRowCount(total);
    setData(dataSource);
  }, [dataSource, isLoading, total]);

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
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater;
    setPagination(newPagination);
    onPaginationChange?.(newPagination);
  };

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (
    updater
  ) => {
    const newColumnFilters =
      typeof updater === "function" ? updater(columnFilters) : updater;
    setColumnFilters(newColumnFilters);
    onColumnFiltersChange?.(newColumnFilters);
  };

  const table = useReactTable({
    ...options,
    data,
    columns,
    rowCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    ...manualProps,
    enableRowSelection: true,
    onRowSelectionChange: onRowSelectionChange || setRowSelection,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onGlobalFilterChange: () => {},
    onColumnVisibilityChange: onColumnVisibilityChange || setColumnVisibility,
    onPaginationChange: useManual ? handlePaginationChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: !useManual ? getFilteredRowModel() : undefined,
    getPaginationRowModel: !useManual ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return { table, rowCount, columnFilters };
}
