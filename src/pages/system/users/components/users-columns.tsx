import { callTypes, userTypes } from "@/mocks/user/data";
import { UserIconRowActions } from "@/pages/system/users/components/users-row-actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnType } from "@/components/DataTable";
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

export const columns: DataTableColumnType<API.User>[] = [
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
  },
  {
    accessorKey: "email",
    headerTitle: "Email",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("email")}</div>,
    meta: headerMeta.meta,
  },
  {
    accessorKey: "phoneNumber",
    headerTitle: "Phone Number",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Phone Number' />,
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    meta: headerMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    headerTitle: "Status",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn("capitalize", badgeColor)}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    meta: headerMeta.meta,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "role",
    headerTitle: "Role",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
    cell: ({ row }) => {
      const { role } = row.original;
      const userType = userTypes.find(({ value }) => value === role);

      if (!userType) {
        return null;
      }

      return (
        <div className='flex gap-x-2 items-center'>
          {userType.icon && <userType.icon size={16} className='text-muted-foreground' />}
          <span className='capitalize text-sm'>{row.getValue("role")}</span>
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
    meta: headerMeta.meta,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "options",
    headerTitle: "Options",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Options' />,
    cell: UserIconRowActions,
    meta: headerMeta.meta,
  },
];
