import { Fragment, useMemo } from "react";
import { noop } from "@/utils";
import { ColumnFiltersState, OnChangeFn, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableColumnType } from "@/components/DataTable";
import TablerIcon from "@/components/IconPicker/tabler-icon";

export interface SearchProps<TData, TValue> {
  key?: string;
  table: Table<TData>;
  columns: DataTableColumnType<TData, TValue>[];
  globalFilterKey?: string;
  col?: number;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: OnChangeFn<ColumnFiltersState>;
  onSearch?: (filters: ColumnFiltersState) => void;
  onReset?: () => void;
}

export function Search<TData, TValue = unknown>({
  table,
  columns,
  globalFilterKey,
  onSearch = noop,
  onReset = noop,
}: SearchProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const inlineSearchColumns = useMemo(
    () => columns.filter((col) => typeof col.renderSearch === "function"),
    [columns]
  );

  const facetedFilterColumns = useMemo(
    () => columns.filter((col) => typeof col.filterComponent === "function"),
    [columns]
  );

  const hasFilters =
    globalFilterKey || inlineSearchColumns.length > 0 || facetedFilterColumns.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {globalFilterKey && (
          <Input
            placeholder='Search all columns...'
            value={(table.getColumn(globalFilterKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(globalFilterKey)?.setFilterValue(event.target.value)}
            className='h-8 w-[150px] lg:w-[250px]'
          />
        )}

        {inlineSearchColumns.map((columnDef, index) => {
          const key = (columnDef.accessorKey as string) ?? `search-${index}`;
          return (
            <Fragment key={key}>
              <div className='flex gap-x-2'>{columnDef.renderSearch!(columnDef, index, table)}</div>
            </Fragment>
          );
        })}

        {facetedFilterColumns.map((columnDef) => {
          const column = table.getColumn(columnDef.accessorKey as string);
          if (!column) return null;
          return (
            <Fragment key={column.id}>
              {columnDef.filterComponent!(column, table)}
            </Fragment>
          );
        })}

        <div className='flex w-full text-sm text-muted-foreground' />
        <div className='flex gap-x-2 text-sm text-muted-foreground'>
          <div className='flex-1 gap-x-2'>
            <Button
              disabled={!isFiltered}
              variant='destructive'
              size='sm'
              onClick={() => {
                table.resetColumnFilters();
                onReset();
              }}
              className='w-18 h-8 px-2 lg:px-3'
            >
              <TablerIcon name='x' className='h-4 w-4' />
              <span className='pr-1'>Reset</span>
            </Button>
          </div>
          <div className='flex-1'>
            <Button
              disabled={!isFiltered}
              onClick={() => {
                onSearch(table.getState().columnFilters);
              }}
              size='sm'
              className='w-18 h-8 px-2 lg:px-3'
            >
              <TablerIcon name='search' className='h-4 w-4' />
              <span className='pr-1'>Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
