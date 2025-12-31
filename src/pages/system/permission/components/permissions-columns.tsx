import { PermissionIconRowActions } from "@/pages/system/permission/components/permissions-row-actions";
import { defaultHeaderMeta } from "@/types";
import { statusValue, statusBadges } from "@/types/system";
import { permissionTypeBadgeColor } from "@/types/system/permissions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Permission>[] = [
  {
    accessorKey: "name",
    header: "Name",
    searchable: true,
    meta: defaultHeaderMeta.meta,
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    searchable: true,
    cell: ({ row }) => <LongText>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "data_scope",
    header: "Data Scope",
    cell: ({ row }) =>
      row.original.data_scope && (
        <Badge variant='outline' className={permissionTypeBadgeColor(row.original.data_scope)}>
          {row.original.data_scope}
        </Badge>
      ),
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "status",
    header: "Status",
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
    meta: defaultHeaderMeta.meta,
  },
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
    cell: ({ row }) => <div>{row.original.update_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
    hiddenInTable: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className='flex'>
        <PermissionIconRowActions row={row} />
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
];
