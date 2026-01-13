import { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface DataTableSearchInputProps<TData, TValue> {
  column: Column<TData, TValue>;
  placeholder?: string;
}

export function DataTableSearchInput<TData, TValue>({ column, placeholder }: DataTableSearchInputProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue() as string | undefined;

  return (
    <Input
      placeholder={placeholder || `Search ${String(column.id)}...`}
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      className='h-8 w-[150px] lg:w-[250px]'
    />
  );
}
