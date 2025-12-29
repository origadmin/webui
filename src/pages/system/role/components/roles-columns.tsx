import { RoleIconRowActions } from "@/pages/system/role/components/roles-row-actions";
import { defaultHeaderMeta } from "@/types";
import { statusValue, statusBadges } from "@/types/system";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    searchable: true,
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div>{row.getValue("sequence")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "permission_ids",
    header: "Permissions",
    cell: ({ row }) => (
      <div>
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
    cell: ({ row }) => <div>{row.getValue("is_system") ? "Yes" : "No"}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RoleIconRowActions row={row} />,
    meta: defaultHeaderMeta.meta,
  },
];
