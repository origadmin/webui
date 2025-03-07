import { Fragment } from "react";
import { noop } from "@/utils";
import { ColumnFiltersState, OnChangeFn, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTableColumnType } from "@/components/DataTable";
import TablerIcon from "@/components/IconPicker/tabler-icon";

export interface SearchProps<TData, TValue> {
  key?: string;
  table: Table<TData>;
  columns: DataTableColumnType<TData, TValue>[];
  col?: number;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: OnChangeFn<ColumnFiltersState>;
  onSearch?: (filters: ColumnFiltersState) => void;
  onReset?: () => void;
}

export function Search<TData, TValue = unknown>({
  table,
  columns,
  onSearch = noop,
  onReset = noop,
}: SearchProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchColumns = columns.filter((column) => column.searchable === true) as DataTableColumnType<TData>[];

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {searchColumns.length > 0 &&
          searchColumns.map((column, index) => {
            const key = column.accessorKey ?? "";
            if (key === "" || !column.renderSearch) {
              return null;
            }
            // console.log("search columns:", column, "value:", table.getColumn(key));
            return (
              <Fragment key={key}>
                <div className='flex gap-x-2'>{column.renderSearch(column, index, table)}</div>
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
                // table.setColumnFilters(table.getState().columnFilters);
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
