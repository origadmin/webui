import { PermissionIconRowActions } from "@/pages/system/permission/components/permissions-row-actions";
import { defaultHeaderMeta } from "@/types";
import { systemStatusColumn } from "@/components/DataTable/common-columns";
import { permissionTypeBadgeColor } from "@/types/system/permissions";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";
import { Input } from "@/components/ui/input";
import { Column } from "@tanstack/react-table";

// Helper function to create a simple text input filter
const textInputFilter = (column: Column<any, unknown>, title: string) => (
  <Input
    placeholder={`Search ${title}...`}
    value={(column.getFilterValue() as string) ?? ""}
    onChange={(event) => column.setFilterValue(event.target.value)}
    className='h-8 w-[150px] lg:w-[250px]'
  />
);

export const columns: DataTableColumnType<API.System.Permission>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: defaultHeaderMeta.meta,
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    enableSorting: false,
    enableHiding: false,
    filterComponent: (column) => textInputFilter(column, "Name"),
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => <LongText>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
    filterComponent: (column) => textInputFilter(column, "Keyword"),
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <LongText>{row.getValue("description")}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  systemStatusColumn,
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
