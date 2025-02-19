import { callTypes, statuses } from "@/mocks/user/data";
import { UserIconRowActions } from "@/pages/system/user/components/users-row-actions";
import { defaultHeaderMeta } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DataTableColumnType } from "@/components/DataTable";
import { FacetedFilter } from "@/components/DataTable/faceted-filter";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.User>[] = [
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
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted group-data-[row=even]/row:bg-muted",
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
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("username")}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("nickname")}</LongText>,
    meta: defaultHeaderMeta.meta,
    searchable: true,
    renderSearch: (column, index, table) => (
      <Input
        key={index}
        placeholder={`Filter ${typeof column.header === "string" ? column.header : "nickname"}...`}
        value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("nickname")?.setFilterValue(event.target.value)}
        className='h-8 w-[120px] lg:w-[250px]'
      />
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("email")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status || 0);
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn("capitalize", badgeColor)}>
            {statuses[row.getValue("status") as number]}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    searchable: true,
    renderSearch: (_column, _index, table) => (
      <FacetedFilter
        column={table.getColumn("status")}
        title={"Status"}
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Invited", value: "invited" },
          { label: "Suspended", value: "suspended" },
        ]}
      />
    ),
    meta: defaultHeaderMeta.meta,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "create_time",
    header: "Create Time",
    cell: ({ row }) => <div>{row.original.create_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "update_time",
    header: "Update Time",
    cell: ({ row }) => <div>{row.getValue("update_time")}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: UserIconRowActions,
    meta: defaultHeaderMeta.meta,
  },
];
