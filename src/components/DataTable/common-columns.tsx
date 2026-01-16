import { ReactNode } from "react";
import { CellContext } from "@tanstack/react-table";
import { statusDescriptors } from "@/types/system";
import { ColorBadge } from "@/components/ui/color-badge";
import { DataTableColumnType, DataTableFacetedFilter } from "@/components/DataTable";
import { headerMeta } from "./column-defaults";

/**
 * A reusable DataTable column definition for a standard 'status' field.
 * It uses the centralized badge system and dynamically generates its filter options.
 */
export const systemStatusColumn = <T,>(): DataTableColumnType<T> => ({
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const statusValue = row.getValue("status") as number;
    const descriptor = statusDescriptors.find((d) => d.value === String(statusValue));

    if (!descriptor) {
      return <ColorBadge colorKey={3}>{String(statusValue)}</ColorBadge>; // Fallback to gray
    }

    return <ColorBadge colorKey={descriptor.colorKey}>{descriptor.label}</ColorBadge>;
  },
  filterFn: (row, id, value: string[]) => {
    return value.includes(String(row.getValue(id)));
  },
  filterComponent: (column) => (
    <DataTableFacetedFilter
      column={column}
      title='Status'
      options={statusDescriptors.map((d) => ({
        label: d.label,
        value: d.value,
        icon: d.icon,
        color: `text-gray-700 dark:text-gray-300`, // Use a neutral color for the checkmark text
      }))}
    />
  ),
  ...headerMeta(),
  enableSorting: false,
  enableHiding: false,
});

/**
 * A reusable DataTable column definition for a standard 'actions' column.
 * It is pinned to the right and has a fixed width.
 */
export const actionsColumn = <T,>(cell: (props: CellContext<T, unknown>) => ReactNode): DataTableColumnType<T> => ({
  id: "actions",
  header: "Actions",
  cell,
  ...headerMeta("w-[100px]"),
  pin: "right",
});