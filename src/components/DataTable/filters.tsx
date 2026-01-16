import { Column } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

/**
 * A simple text input filter component for DataTable columns.
 *
 * @param column - The column to filter.
 * @param title - The title to display in the placeholder.
 */
export const TextInputFilter = <TData,>(column: Column<TData, unknown>, title: string) => {
  return (
    <Input
      placeholder={`Search ${title}...`}
      value={(column.getFilterValue() as string) ?? ""}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className='h-8 w-[150px] lg:w-[250px]'
    />
  );
};
