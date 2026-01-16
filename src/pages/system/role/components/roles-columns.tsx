import { RoleIconRowActions } from "@/pages/system/role/components/roles-row-actions";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import { actionsColumn, systemStatusColumn } from "@/components/DataTable/common-columns";
import { headerMeta } from "@/components/DataTable/column-defaults";
import { TextInputFilter } from "@/components/DataTable/filters";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    ...headerMeta(),
    enableSorting: true,
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
    ...headerMeta(),
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div>{row.getValue("sequence")}</div>,
    ...headerMeta(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <LongText>{row.getValue("description")}</LongText>,
    ...headerMeta(),
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
    ...headerMeta(),
  },
  systemStatusColumn(),
  actionsColumn(({ row }) => <RoleIconRowActions row={row} />),
];
