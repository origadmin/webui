import { RoleIconRowActions } from "@/pages/system/role/components/roles-row-actions";
import { defaultHeaderMeta } from "@/types";
import { statusValue, statusBadges } from "@/types/system";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Role>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) =>
  //     table ? (
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label='Select all'
  //         className='translate-y-[2px]'
  //       />
  //     ) : null,
  //   meta: {
  //     className: cn(
  //       "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
  //       "md:table-cell",
  //     ),
  //   },
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: "Name",
    searchable: true,
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Rolename' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("name")}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    searchable: true,
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Nickname' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "type",
    header: "Type",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("type")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("sequence")}</div>,
    meta: defaultHeaderMeta.meta,
  },

  {
    accessorKey: "permission_ids",
    header: "Permissions",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => (
      <div className='w-fit max-w-36 text-nowrap'>
        {row.original.permissions &&
          row.original.permissions.slice(0, 1).map((item) => (
            <Badge variant='outline' key={item.id}>
              {item.name}
            </Badge>
          ))}
        {row.original.permissions && row.original.permissions.length > 1 ? (
          <Badge variant='outline' className='capitalize'>
            {`+ ${row.original.permissions?.length - 1} more`}
          </Badge>
        ) : null}
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "status",
    header: "Status",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const { status = 0 } = row.original;
      const badgeColor = statusBadges.get(status || 0);
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn("capitalize", badgeColor)}>
            {statusValue[status]}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    meta: defaultHeaderMeta.meta,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "is_system",
    header: "Is System",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("is_system") ? "Yes" : "No"}</div>,
    meta: defaultHeaderMeta.meta,
  },

  {
    id: "actions",
    header: "Actions",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Options' />,
    cell: ({ row }) => (
      <div className='flex gap-1.5 min-w-[100px] overflow-x-auto no-scrollbar'>
        <RoleIconRowActions row={row} />
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
];
