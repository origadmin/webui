import { ReactNode, useMemo } from "react";
import { PAGE_SIZE_OPTIONS } from "@/types";
import { ColumnFiltersState, ExpandedState, OnChangeFn, PaginationState, Row, SortingState, TableOptions, VisibilityState } from "@tanstack/react-table";
import { TitleBar, TitleBarProps } from "src/components/DataTable/title-bar";
import { LoadingRow, NoResults } from "@/components/ui/data-table-feedback";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Toolbar, ToolbarProps } from "@/components/DataTable/toolbar";
import { ColumnHeader, ColumnHeaderProps } from "./column-header";
import { DataTableFacetedFilter } from "./faceted-filter";
import { Pagination, PaginationProps } from "./pagination";
import { Search, SearchProps } from "./search";
import { renderCell, renderRow } from "./table-renderer";
import { ColumnType } from "./types";
import { useDataTable } from "./use-data-table";
import { ViewOptions, ViewOptionsProps } from "./view-options";


interface DataProps<TData, TValue> {
  columns: ColumnType<TData, TValue>[];
  dataSource?: TData[];
  total?: number;
  isLoading?: boolean;
}

interface DisplayProps<TData> {
  showStatistics?: boolean;
  showPagination?: boolean;
  sizeOptions?: PaginationProps<TData>["sizeOptions"];
}

interface BehaviorProps {
  useManual?: boolean;
  paginationState?: PaginationState;
  columnFiltersState?: ColumnFiltersState;
  columnVisibilityState?: VisibilityState;
  expandedState?: ExpandedState;
  sorting?: SortingState;
  globalFilterKey?: string;
  onSortingChange?: OnChangeFn<SortingState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onRowSelectionChange?: OnChangeFn<VisibilityState>;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  onExpandedChange?: OnChangeFn<ExpandedState>;
}

interface ComponentProps<TData, TValue> {
  search?: Omit<SearchProps<TData, TValue>, "table" | "columns" | "columnFilters" | "globalFilterKey">;
  pagination?: Omit<PaginationProps<TData>, "table" | "toolbars" | "sizeOptions">;
  title?: Omit<TitleBarProps<TData>, "table" | "toolbars">;
  toolbar?: Omit<ToolbarProps<TData>, "table" | "children" | "render">;
}

export interface DataTableProps<TData, TValue = unknown>
  extends DataProps<TData, TValue>,
    DisplayProps<TData>,
    BehaviorProps {
  toolbarPosition?: "top" | "bottom";
  toolbars?: ToolbarProps<TData>["children"] | ToolbarProps<TData>["render"];
  options?: Partial<Omit<TableOptions<TData>, "data" | "columns">>;
  props: ComponentProps<TData, TValue>;
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode;
}

function DataTable<TData, TValue = unknown>({
  columns,
  showStatistics = true,
  showPagination = true,
  sizeOptions = PAGE_SIZE_OPTIONS,
  toolbars,
  toolbarPosition = "top",
  props,
  isLoading,
  renderSubComponent,
  ...rest
}: DataTableProps<TData, TValue>) {
  const { table, rowCount, columnFilters } = useDataTable({
    columns,
    ...rest,
  });

  const { search, title, pagination, toolbar } = props;
  const toolbarProps: Omit<ToolbarProps<TData>, "table"> = typeof toolbars === "function"
    ? {
        ...toolbar,
        render: toolbars,
      }
    : {
        ...toolbar,
        children: toolbars,
      };

  const searchFields = useMemo(() => columns.filter((col) => !col.hiddenInSearch && !col.searchComponent), [columns]);

  return (
    <div className='space-y-4'>
      <Search
        {...search}
        table={table}
        columns={searchFields}
        columnFilters={columnFilters}
        globalFilterKey={rest.globalFilterKey}
      />
      <TitleBar
        {...title}
        table={table}
        toolbar={toolbarPosition === "top" ? toolbarProps : undefined}
        statistics={showStatistics}
        total={rowCount}
      />
      <div className='rounded-md border'>
        <Table className='w-full'>
          <TableHeader>{renderRow(table.getHeaderGroups())}</TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingRow colSpan={columns.length} />
            ) : table.getRowModel().rows?.length ? (
              renderCell(table.getRowModel().rows, renderSubComponent)
            ) : (
              <NoResults colSpan={columns.length} />
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination ? (
        <Pagination
          {...pagination}
          table={table}
          sizeOptions={sizeOptions}
          toolbar={toolbarPosition === "bottom" ? toolbarProps : undefined}
        />
      ) : toolbarPosition === "bottom" ? (
        <div className='flex items-center justify-between overflow-auto px-2 gap-4'>
          <Toolbar {...toolbarProps} table={table} />
        </div>
      ) : null}
    </div>
  );
}

export type {
  PaginationProps as DataTablePaginationOptions,
  ToolbarProps as DataTableToolbarProps,
  ViewOptionsProps as DataTableViewOptionsProps,
  ColumnHeaderProps as DataTableColumnHeaderProps,
  SearchProps as DataTableSearchBarProps,
};

export type { ColumnType as DataTableColumnType };
export {
  Pagination as DataTablePagination,
  TitleBar as DataTableToolbar,
  ViewOptions as DataTableViewOptions,
  ColumnHeader as DataTableColumnHeader,
  Search as DataTableSearchBar,
  DataTableFacetedFilter,
};
export { DataTable };
