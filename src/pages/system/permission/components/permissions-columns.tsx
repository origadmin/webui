import { PermissionIconRowActions } from "@/pages/system/permission/components/permissions-row-actions";
import { permissionTypeBadgeColor } from "@/types/system/permissions";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import { headerMeta } from "@/components/DataTable/column-defaults";
import { actionsColumn, systemStatusColumn } from "@/components/DataTable/common-columns";
import { TextInputFilter } from "@/components/DataTable/filters";
import LongText from "@/components/long-text";


export const columns: DataTableColumnType<API.System.Permission>[] = [
  {
    accessorKey: "name",
    header: "Name",
    ...headerMeta(),
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    enableSorting: false,
    enableHiding: false,
    filterComponent: (column) => TextInputFilter(column, "Name"),
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => <LongText>{row.getValue("keyword")}</LongText>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Keyword"),
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
    ...headerMeta(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <LongText>{row.getValue("description")}</LongText>,
    ...headerMeta(),
  },
  systemStatusColumn(),
  {
    accessorKey: "resources",
    header: "Resources",
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
    ...headerMeta(),
  },
  {
    accessorKey: "update_time",
    header: "Update Time",
    cell: ({ row }) => <div>{row.original.update_time}</div>,
    ...headerMeta(),
    enableSorting: false,
    hiddenInTable: true,
  },
  actionsColumn(({ row }) => (
    <div className='flex'>
      <PermissionIconRowActions row={row} />
    </div>
  )),
];
