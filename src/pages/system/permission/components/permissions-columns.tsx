import { PermissionIconRowActions } from "@/pages/system/permission/components/permissions-row-actions";
import { defaultHeaderMeta } from "@/types";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Permission>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "data_scope",
    header: "Data Scope",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("data_scope")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  // {
  //   accessorKey: "data_rules",
  //   header: "Data Rules",
  //   cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("data_rules")}</div>,
  //   meta: defaultHeaderMeta.meta,
  // },
  // {
  //   accessorKey: "create_time",
  //   header: "Create Time",
  //   cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.original.create_time}</div>,
  //   meta: defaultHeaderMeta.meta,
  //   enableSorting: false,
  // },
  {
    accessorKey: "resources",
    header: "Resources",
    searchable: false,
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-1'>
        {row.original.resources && row.original.resources.length > 0 ? (
          row.original.resources.slice(0, 2).map((resource) => (
            <Badge key={resource.id} variant='secondary' className='text-xs'>
              {resource.name}
            </Badge>
          ))
        ) : (
          <span className='text-muted-foreground'>None</span>
        )}
        {row.original.resources && row.original.resources.length > 2 && (
          <Badge variant='secondary' className='text-xs'>
            +{row.original.resources.length - 2} more
          </Badge>
        )}
      </div>
    ),
    meta: defaultHeaderMeta.meta,
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
