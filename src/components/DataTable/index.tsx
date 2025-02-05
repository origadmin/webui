import { useEffect, useMemo, useState } from "react";
import { PAGE_SIZE, START_PAGE, PAGE_SIZE_OPTIONS } from "@/types";
import { useRouter } from "@tanstack/react-router";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationOptions,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  PaginationState,
} from "@tanstack/react-table";
import { TitleBar, TitleBarProps } from "src/components/DataTable/title-bar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToolbarProps } from "@/components/DataTable/toolbar";
import { ColumnHeader, ColumnHeaderProps } from "./column-header";
import { Pagination, PaginationProps } from "./pagination";
import { RowActions, RowActionsProps } from "./row-actions";
import { SearchBar, SearchBarProps } from "./search-bar";
import { ViewOptions, ViewOptionsProps } from "./view-options";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

type ColumnType<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  searchable?: boolean;
};

interface DataTableProps<T> {
  data: T[];
  columns: ColumnType<T>[];
  searchBarProps?: SearchBarProps<T>;
  toolbars?: TitleBarProps<T>["toolbars"];
  paginationState?: PaginationState;
  sizeOptions?: PaginationProps<T>["sizeOptions"];
  paginationProps?: PaginationProps<T>;
}

const searchParamsToSortingState = (searchParams: URLSearchParams): SortingState => {
  const sort = searchParams.get("sort");
  if (sort === null) {
    return [];
  }
  return sort.split(",").map((sort) => {
    const [id, desc] = sort.split(":");
    return { id, desc: desc === "desc" };
  });
};

function DataTable<T>({
  columns,
  toolbars,
  data,
  paginationState = { pageSize: PAGE_SIZE, pageIndex: START_PAGE },
  sizeOptions = PAGE_SIZE_OPTIONS,
}: DataTableProps<T>) {
  const router = useRouter();
  const searchParams = router.routeTree.useSearch();

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const oldSearchParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const currentSearch = oldSearchParams.toString();
  const [sorting, setSorting] = useState<SortingState>(searchParamsToSortingState(oldSearchParams));
  console.log("sorting", sorting);

  useEffect(() => {
    const currentPathname = router.state.location.pathname;

    const currentSearchParams = new URLSearchParams(currentSearch);
    currentSearchParams.set("sort", sorting.map((sort) => `${sort.id}:${sort.desc ? "desc" : "asc"}`).join(","));
    const nextSearch = currentSearchParams.toString();
    if (nextSearch === "") {
      return;
    }

    if (currentSearch !== nextSearch) {
      console.log("currentSearchParams", nextSearch, "currentSearch", currentSearch);
      const path = `${currentPathname}?${nextSearch}`;
      router.history.push(path.replaceAll("\\%3A", ":"));
    }
  }, [router, sorting, currentSearch]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: paginationState,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // getCoreRowModel: props.getCoreRowModel ?? getCoreRowModel(),
    // getFilteredRowModel: props.getFilteredRowModel ?? getFilteredRowModel(),
    // getPaginationRowModel: props.getPaginationRowModel ?? getPaginationRowModel(),
    // getSortedRowModel: props.getSortedRowModel ?? getSortedRowModel(),
    // getFacetedRowModel: props.getFacetedRowModel ?? getFacetedRowModel(),
    // getFacetedUniqueValues: props.getFacetedUniqueValues ?? getFacetedUniqueValues(),
  });

  return (
    <div className='space-y-4'>
      <SearchBar table={table} />
      <TitleBar table={table} toolbars={toolbars} showStatistics={true} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='group/row'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={header.column.columnDef.meta?.className ?? ""}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className='group/row'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className ?? ""}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {<Pagination table={table} sizeOptions={sizeOptions} toolbars={toolbars} />}
    </div>
  );
}

export type { DataTableProps, ColumnType, ColumnType as DataTableColumnType };
export type {
  RowActionsProps as DataTableRowActionsProps,
  PaginationOptions as DataTablePaginationOptions,
  ToolbarProps as DataTableToolbarProps,
  ViewOptionsProps as DataTableViewOptionsProps,
  ColumnHeaderProps as DataTableColumnHeaderProps,
  SearchBarProps as DataTableSearchBarProps,
};
export {
  RowActions as DataTableRowActions,
  Pagination as DataTablePagination,
  TitleBar as DataTableToolbar,
  ViewOptions as DataTableViewOptions,
  ColumnHeader as DataTableColumnHeader,
  SearchBar as DataTableSearchBar,
};
export { DataTable };
