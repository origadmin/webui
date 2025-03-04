import { useState, useEffect } from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnType } from "@/components/DataTable";

const getFilteredColumns = <TData,>(table: Table<TData>) => {
  return table.getAllColumns().filter((column) => {
    const columnDef = column.columnDef as DataTableColumnType<TData, never>;
    return (
      column.id !== "select" &&
      column.id &&
      columnDef &&
      columnDef.enableHiding !== false &&
      !columnDef.hiddenInTable &&
      column.accessorFn !== undefined &&
      column.getCanHide()
    );
  });
};

export interface ViewOptionsProps<TData> {
  table: Table<TData>;
}

export function ViewOptions<TData>({ table }: ViewOptionsProps<TData>) {
  const tableColumns = getFilteredColumns(table);
  const [columns, setColumns] = useState(tableColumns);
  const [viewChanged, setViewChanged] = useState(false);
  useEffect(() => {
    if (!viewChanged) {
      return;
    }
    setViewChanged(false);
    const newTableColumns = getFilteredColumns(table);
    setColumns(newTableColumns);
  }, [table, viewChanged]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => {
          const columnDef = column.columnDef as DataTableColumnType<TData, never>;
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className='capitalize'
              checked={column.getIsVisible()}
              onCheckedChange={(state) => {
                setViewChanged(true);
                column.toggleVisibility(state);
              }}
            >
              {typeof columnDef.header === "string" ? columnDef.header : column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          key='reset-columns-view'
          className='capitalize'
          checked={table.getIsAllColumnsVisible()}
          onCheckedChange={(state) => {
            setViewChanged(true);
            table.resetColumnVisibility(state);
          }}
        >
          <span>Reset View</span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
