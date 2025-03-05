import { PermissionIconRowActions } from "@/pages/system/permission/components/permissions-row-actions";
import { defaultHeaderMeta } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader, DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Permission>[] = [
  {
    accessorKey: "name",
    header: ({ column, table }) => (
      <div className='flex items-center gap-1.5 min-w-[100px] overflow-x-auto no-scrollbar'>
        {table.getRowModel().rows.length > 0 && (
          <Checkbox
            checked={table.getIsAllRowsExpanded() || (table.getIsSomeRowsExpanded() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllRowsExpanded(!!value)}
            aria-label='Select all'
          />
        )}
        <DataTableColumnHeader className='px-2' column={column} title='Name' />
      </div>
    ),
    searchable: true,
    meta: defaultHeaderMeta.meta,
    cell: ({ row }) => <LongText className='max-w-60'>{row.getValue("name")}</LongText>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    searchable: true,
    cell: ({ row }) => <LongText className='max-w-60'>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("sequence")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "visible",
    header: "Visible",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("visible") ? "Yes" : "No"}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "create_time",
    header: "Create Time",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.original.create_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "update_time",
    header: "Update Time",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.original.update_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
    hiddenInTable: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className='flex min-w-[100px] overflow-x-auto no-scrollbar'>
        <PermissionIconRowActions row={row} />
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
];
