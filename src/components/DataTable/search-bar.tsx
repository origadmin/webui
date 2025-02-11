import { Table } from "@tanstack/react-table";
import { X as XIcon, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableColumnType } from "@/components/DataTable";
import { FacetedFilter } from "./faceted-filter";

export interface SearchBarProps<TData> {
  table: Table<TData>;
  columns: DataTableColumnType<TData>[];
  col?: number;
}

export function SearchBar<TData>({ table, columns }: SearchBarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const searchColumns = columns.filter((column) => column.searchable === true) as DataTableColumnType<TData>[];

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {searchColumns.length > 0 &&
          searchColumns.map((column, index) => {
            const key = column.accessorKey ?? "";
            if (key === "") {
              return null;
            }
            console.log("search columns:", column, "value:", table.getColumn(key));
            return (
              <Input
                key={index}
                placeholder={`Filter ${column.headerTitle || key}...`}
                value={(table.getColumn(key)?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn(key)?.setFilterValue(event.target.value)}
                className='h-8 w-[120px] lg:w-[250px]'
              />
            );
          })}
        <div className='flex gap-x-2'>
          {table.getColumn("status") && (
            <FacetedFilter
              column={table.getColumn("status")}
              title={"Status"}
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
                { label: "Invited", value: "invited" },
                { label: "Suspended", value: "suspended" },
              ]}
            />
          )}
          {/*{table.getColumn("role") && (*/}
          {/*  <FacetedFilter column={table.getColumn("role")} title='Role' options={userTypes.map((t) => ({ ...t }))} />*/}
          {/*)}*/}
        </div>
        {/*{isFiltered && (*/}
        {/*  <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>*/}
        {/*    Reset*/}
        {/*    <XIcon className='ml-2 h-4 w-4' />*/}
        {/*  </Button>*/}
        {/*)}*/}
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
            <Button
              disabled={!isFiltered}
              onClick={() => console.log("query", table.getState().columnFilters)}
              size='sm'
              className='w-18 px-2 lg:px-3'
            >
              <SearchIcon className='h-4 w-4' />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
