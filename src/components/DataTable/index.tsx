import { ReactNode, useEffect, useState } from "react";
import { PAGE_SIZE, START_PAGE, PAGE_SIZE_OPTIONS } from "@/types";
import {
  ColumnFiltersState,
  PaginationOptions,
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
  RowData,
  PaginationState,
  Renderable,
  HeaderContext,
  Column,
  ColumnDef,
  Table as ReactTable,
  ColumnMeta,
  Row,
  HeaderGroup,
  OnChangeFn,
} from "@tanstack/react-table";
import { TitleBar, TitleBarProps } from "src/components/DataTable/title-bar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToolbarProps } from "@/components/DataTable/toolbar";
import { ColumnHeader, ColumnHeaderProps } from "./column-header";
import { Pagination, PaginationProps } from "./pagination";
import { IconRowActions, RowActions, RowActionsProps } from "./row-actions";
import { SearchBar, SearchBarProps } from "./search-bar";
import { ViewOptions, ViewOptionsProps } from "./view-options";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
    row?: TData;
    value?: TValue;
  }
}

type ColumnType<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  accessorKey?: string;
  searchable?: boolean;
  renderSearch?: (column: ColumnType<TData, TValue>, index: number, table: ReactTable<TData>) => ReactNode;
  headerTitle?: string;
  meta: ColumnMeta<TData, TValue>;
};

// type QueryOption<
//   TQueryFnData = unknown,
//   TError = DefaultError,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > =
//   | DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
//   | UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
//   | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;

interface SortProps {
  key?: string;
  delimiter?: string;
  contact?: string;
  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
}

interface ColumnFilterProps {
  // columnFilters?: ColumnFiltersState;
  // setColumnFilters?: OnChangeFn<ColumnFiltersState>;
  onSearchCommit?: (filter: ColumnFiltersState) => void;
}

interface DataTableProps<T> {
  columns: ColumnType<T>[];
  sourceData?: T[];
  total?: number;
  searchBarProps?: SearchBarProps<T>;
  showToolbarStatistics?: boolean;
  showPagination?: boolean;
  useManual?: boolean;
  toolbarPosition?: "top" | "bottom";
  toolbars?: TitleBarProps<T>["toolbars"];
  paginationState?: PaginationState;
  columnFiltersState?: ColumnFiltersState;
  sizeOptions?: PaginationProps<T>["sizeOptions"];
  paginationProps?: Omit<PaginationProps<T>, "table">;
  columnFilterProps?: ColumnFilterProps;
  titleBarProps?: TitleBarProps<T>;
  sortProps?: SortProps;
  isLoading?: boolean;
}

const renderHeader = <TData, TValue>(column: Column<TData>): Renderable<HeaderContext<TData, TValue>> => {
  const columnDef = column.columnDef as ColumnType<TData, TValue>;
  if (columnDef.headerTitle) {
    return <ColumnHeader column={column} title={columnDef.headerTitle} />;
  }
  return column.columnDef.header;
};
const renderRow = <TData,>(groups: HeaderGroup<TData>[]) => {
  return groups.map((headerGroup) => (
    <TableRow key={headerGroup.id} className='group/row'>
      {headerGroup.headers.map((header) => {
        return (
          <TableHead key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.className ?? ""}>
            {header.isPlaceholder ? null : flexRender(renderHeader(header.column), header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  ));
};

const renderCell = <TData,>(rows: Row<TData>[]): ReactNode => {
  if (rows && rows.length > 0) {
    return rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className='group/row'>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className={cell.column.columnDef.meta?.className ?? ""}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  }
  return (
    <TableRow>
      <TableCell colSpan={rows.length} className='h-24 text-center'>
        No results.
      </TableCell>
    </TableRow>
  );
};

function DataTable<T>({
  columns,
  toolbars,
  sourceData = [],
  total = 0,
  paginationState = { pageSize: PAGE_SIZE, pageIndex: START_PAGE },
  columnFiltersState = [],
  showToolbarStatistics = true,
  showPagination = true,
  useManual = true,
  toolbarPosition = "top",
  sizeOptions = PAGE_SIZE_OPTIONS,
  paginationProps,
  columnFilterProps,
  titleBarProps,
  sortProps,
  isLoading,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(columnFiltersState);
  const [_pagination, _setPagination] = useState<PaginationState>(paginationState);
  const { pagination, setPagination } = paginationProps ?? {
    pagination: _pagination,
    setPagination: _setPagination,
  };
  const [_sorting, _setSorting] = useState<SortingState>([]);
  const { sorting, setSorting } = sortProps ?? {
    sorting: _sorting,
    setSorting: _setSorting,
  };
  // const { columnFilters, setColumnFilters } = columnFilterProps ?? {
  //   columnFilters: _columnFilters,
  //   setColumnFilters: _setColumnFilters,
  // };

  const [data, setData] = useState(sourceData || []);
  const [rowCount, setRowCount] = useState(total || 0);
  useEffect(() => {
    if (isLoading) return;
    setData(sourceData);
    setRowCount(total);
  }, [isLoading, sourceData, total]);

  const manualProps = useManual
    ? {
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
      }
    : {};
  const table = useReactTable({
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
    initialState: {
      pagination: paginationState,
    },
    ...manualProps,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: !useManual ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: useManual ? setPagination : undefined,
  });

  return (
    <div className='space-y-4'>
      <SearchBar table={table} columns={columns} onSearchCommit={columnFilterProps?.onSearchCommit} />
      <TitleBar
        {...titleBarProps}
        table={table}
        toolbars={toolbarPosition === "top" ? toolbars : undefined}
        showStatistics={showToolbarStatistics}
        total={rowCount}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>{renderRow(table.getHeaderGroups())}</TableHeader>
          <TableBody>{renderCell(table.getRowModel().rows)}</TableBody>
        </Table>
      </div>
      {showPagination && (
        <Pagination
          table={table}
          sizeOptions={sizeOptions}
          toolbars={toolbarPosition === "bottom" ? toolbars : undefined}
          {...paginationProps}
        />
      )}
    </div>
  );
}

export type {
  RowActionsProps as DataTableRowActionsProps,
  PaginationOptions as DataTablePaginationOptions,
  ToolbarProps as DataTableToolbarProps,
  ViewOptionsProps as DataTableViewOptionsProps,
  ColumnHeaderProps as DataTableColumnHeaderProps,
  SearchBarProps as DataTableSearchBarProps,
};

export type { DataTableProps, ColumnType, ColumnType as DataTableColumnType };
export {
  RowActions as DataTableRowActions,
  IconRowActions as DataTableIconRowActions,
  Pagination as DataTablePagination,
  TitleBar as DataTableToolbar,
  ViewOptions as DataTableViewOptions,
  ColumnHeader as DataTableColumnHeader,
  SearchBar as DataTableSearchBar,
};
export { DataTable };
