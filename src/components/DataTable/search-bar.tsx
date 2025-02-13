import { noop } from "@/utils";
import { Table } from "@tanstack/react-table";
import { X as XIcon, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnType } from "@/components/DataTable";

export interface SearchBarProps<TData> {
  table: Table<TData>;
  columns: DataTableColumnType<TData>[];
  col?: number;
  searchCommit?: () => void;
}

export function SearchBar<TData>({ table, columns, searchCommit = noop }: SearchBarProps<TData>) {
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
            return <div className='flex gap-x-2'>{column.renderSearch(column, index, table)}</div>;
          })}
        <div className='flex w-full text-sm text-muted-foreground' />
        <div className='flex gap-x-2 text-sm text-muted-foreground'>
          <div className='flex-1 gap-x-2'>
            <Button
              disabled={!isFiltered}
              variant='destructive'
              size='sm'
              onClick={() => table.resetColumnFilters()}
              className='w-18 px-2 lg:px-3'
            >
              <XIcon className='h-4 w-4' />
              Reset
            </Button>
          </div>
          <div className='flex-1'>
            <Button disabled={!isFiltered} onClick={() => searchCommit} size='sm' className='w-18 px-2 lg:px-3'>
              <SearchIcon className='h-4 w-4' />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
