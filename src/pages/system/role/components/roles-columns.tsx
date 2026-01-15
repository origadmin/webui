import { RoleIconRowActions } from "@/pages/system/role/components/roles-row-actions";
import { defaultHeaderMeta } from "@/types";
import { Column } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTableColumnType } from "@/components/DataTable";
import { systemStatusColumn } from "@/components/DataTable/common-columns";
import LongText from "@/components/long-text";


// Helper function to create a simple text input filter
const textInputFilter = (column: Column<any, unknown>, title: string) => (
  <Input
    placeholder={`Search ${title}...`}
    value={(column.getFilterValue() as string) ?? ""}
    onChange={(event) => column.setFilterValue(event.target.value)}
    className='h-8 w-[150px] lg:w-[250px]'
  />
);

export const columns: DataTableColumnType<API.System.Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <LongText>{row.getValue("name")}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <LongText>{row.getValue("description")}</LongText>,
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
  systemStatusColumn,
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RoleIconRowActions row={row} />,
    meta: defaultHeaderMeta.meta,
  },
];
