import { callTypes, statuses } from "@/mocks/user/data";
import { UserIconRowActions } from "@/pages/system/user/components/users-row-actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DataTableColumnType } from "@/components/DataTable";
import { FacetedFilter } from "@/components/DataTable/faceted-filter";
import LongText from "@/components/long-text";

const headerMeta = {
  meta: {
    className: cn(
      "p-2 drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
      "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
      "sticky left-6 md:table-cell",
    ),
  },
};

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
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
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
    headerTitle: "Username",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Username' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("username")}</LongText>,
    meta: headerMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "nickname",
    headerTitle: "Nickname",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Nickname' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("nickname")}</LongText>,
    meta: headerMeta.meta,
    searchable: true,
    renderSearch: (column, index, table) => (
      <Input
        key={index}
        placeholder={`Filter ${column.headerTitle || "nickname"}...`}
        value={(table.getColumn("nickname")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("nickname")?.setFilterValue(event.target.value)}
        className='h-8 w-[120px] lg:w-[250px]'
      />
    ),
  },
  {
    accessorKey: "email",
    headerTitle: "Email",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("email")}</div>,
    meta: headerMeta.meta,
  },
  {
    accessorKey: "phone",
    headerTitle: "Phone",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Phone Number' />,
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    meta: headerMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    headerTitle: "Status",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
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
    meta: headerMeta.meta,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "create_time",
    headerTitle: "Create Time",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Create Time' />,
    cell: ({ row }) => <div>{row.original.create_time}</div>,
    meta: headerMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "update_time",
    headerTitle: "Update Time",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Update Time' />,
    cell: ({ row }) => <div>{row.getValue("update_time")}</div>,
    meta: headerMeta.meta,
    enableSorting: false,
  },
  {
    id: "options",
    headerTitle: "Options",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Options' />,
    cell: UserIconRowActions,
    meta: headerMeta.meta,
  },
];
