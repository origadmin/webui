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
  hiddenInTable?: boolean;
  meta: ColumnMeta<TData, TValue>;
};

interface DataProps<TData> {
  columns: ColumnType<TData>[];
  sourceData?: TData[];
  total?: number;
  isLoading?: boolean;
}

interface DisplayProps<TData> {
  showToolbarStatistics?: boolean;
  showPagination?: boolean;
  sizeOptions?: PaginationProps<TData>["sizeOptions"];
}

interface TableOptions<TData> {
  options: TableOptions<TData>;
}

interface BehaviorProps {
  useManual?: boolean;
  paginationState?: PaginationState;
  columnFiltersState?: ColumnFiltersState;
  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
  setColumnFilters?: OnChangeFn<ColumnFiltersState>;
  setPagination?: OnChangeFn<PaginationState>;
  onRowSelectionChange?: OnChangeFn<VisibilityState>;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
}

interface ComponentProps<TData> {
  search?: Omit<SearchBarProps<TData>, "table" | "columns" | "columnFilters">;
  pagination?: Omit<PaginationProps<TData>, "table" | "toolbars" | "sizeOptions">;
  title?: Omit<TitleBarProps<TData>, "table" | "toolbars">;
  toolbar?: Omit<ToolbarProps<TData>, "table" | "children" | "render">;
}

interface DataTableProps<TData> extends DataProps<TData>, DisplayProps<TData>, BehaviorProps {
  toolbarPosition?: "top" | "bottom";
  toolbars?: ToolbarProps<TData>["children"] | ToolbarProps<TData>["render"];
  options?: TableOptions<TData>;
  props: ComponentProps<TData>;
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
      <TableCell colSpan={rows.length} className='h-24 text-center items-center'>
        No results.
      </TableCell>
    </TableRow>
  );
};

function DataTable<T>({
  columns,
  sourceData = [],
  total = 0,
  showToolbarStatistics = true,
  showPagination = true,
  useManual = true,
  sizeOptions = PAGE_SIZE_OPTIONS,
  paginationState = { pageSize: PAGE_SIZE, pageIndex: START_PAGE },
  columnFiltersState = [],
  sorting,
  setSorting,
  setColumnFilters,
  setPagination,
  onRowSelectionChange: onRowSelectionChange,
  onColumnVisibilityChange: onColumnVisibilityChange,
  // searchBarProps,
  // paginationProps,
  // titleProps,
  toolbars,
  toolbarPosition = "top",
  props,
  isLoading,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
  onRowSelectionChange = onRowSelectionChange || setRowSelection;
  onColumnVisibilityChange = onColumnVisibilityChange || setColumnVisibility;

  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: {
      pagination: paginationState,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters: columnFiltersState,
    },
    ...manualProps,
    enableRowSelection: true,
    onRowSelectionChange: onRowSelectionChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: !useManual ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: useManual ? setPagination : undefined,
  });

  const { search, title, pagination, toolbar } = props;
  const toolbarProps: Omit<ToolbarProps<T>, "table"> = typeof toolbars === "function"
    ? {
        ...toolbar,
        render: toolbars,
      }
    : {
        ...toolbar,
        children: toolbars,
      };

  return (
    <div className='space-y-4'>
      <SearchBar {...search} table={table} columns={columns} columnFilters={columnFiltersState} />
      <TitleBar
        {...title}
        table={table}
        toolbar={toolbarPosition === "top" ? toolbarProps : undefined}
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
          {...pagination}
          table={table}
          sizeOptions={sizeOptions}
          toolbar={toolbarPosition === "bottom" ? toolbarProps : undefined}
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
