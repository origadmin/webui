import { JSX, useState } from "react";
import { PAGE_SIZE, START_PAGE } from "@/types";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Searchbar } from "@/components/DataTable/searchbar";
import { Pagination, PaginationProps } from "./pagination";
import { Toolbar, ToolbarProps } from "./toolbar";
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
  toolbars?: JSX.Element;
  paginationState?: PaginationState;
  sizeOptions?: PaginationProps<T>["sizeOptions"];
}

function DataTable<T>({ columns, toolbars, data, paginationState, sizeOptions }: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

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
      pagination: paginationState ?? { pageSize: PAGE_SIZE, pageIndex: START_PAGE },
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
      <Searchbar table={table} />
      <Toolbar table={table} toolbars={toolbars} />
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
      {
        <Pagination
          table={table}
          sizeOptions={sizeOptions}
          // pagination={table.getState().pagination}
          // onChange={table.setPagination}
          // pageSize={table.getState().pagination.pageSize}
          // setPageSize={table.setPageSize}
          // pageIndex={table.getState().pagination.pageIndex}
          // setPageIndex={table.setPageIndex}
          // getPageCount={table.getPageCount}
          // getCanNextPage={table.getCanNextPage}
          // getCanPreviousPage={table.getCanPreviousPage}
          // nextPage={table.nextPage}
          // previousPage={table.previousPage}
          // sizeOptions={PAGE_SIZE_OPTIONS}
          // selectedCount={table.getFilteredSelectedRowModel().rows.length}
          // totalCount={table.getFilteredRowModel().rows.length}
        />
      }
    </div>
  );
}

export type { DataTableProps, ColumnType, ColumnType as DataTableColumnType };
export type {
  PaginationOptions as DataTablePaginationOptions,
  ToolbarProps as DataTableToolbarProps,
  ViewOptionsProps as DataTableViewOptionsProps,
};
export { Pagination as DataTablePagination, Toolbar as DataTableToolbar, ViewOptions as DataTableViewOptions };
export { DataTable };
