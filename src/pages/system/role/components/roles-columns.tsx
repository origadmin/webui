import { callTypes } from "@/mocks/role/data";
import { RoleIconRowActions } from "@/pages/system/role/components/roles-row-actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

const headerMeta = {
  meta: {
    className: cn(
      "p-2 drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
      "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
      "sticky left-6 md:table-cell",
    ),
  },
};

export const columns: DataTableColumnType<API.Role>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "md:table-cell",
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    headerTitle: "Name",
    searchable: true,
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Rolename' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("name")}</LongText>,
    meta: headerMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "keyword",
    headerTitle: "Keyword",
    searchable: true,
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Nickname' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("keyword")}</LongText>,
    meta: headerMeta.meta,
  },
  {
    accessorKey: "description",
    headerTitle: "Description",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("description")}</div>,
    meta: headerMeta.meta,
  },
  {
    accessorKey: "status",
    headerTitle: "Status",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn("capitalize", badgeColor)}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    meta: headerMeta.meta,
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: "options",
    headerTitle: "Options",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Options' />,
    cell: RoleIconRowActions,
    meta: headerMeta.meta,
  },
];
