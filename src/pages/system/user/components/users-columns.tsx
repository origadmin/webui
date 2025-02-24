import { UserIconRowActions } from "@/pages/system/user/components/users-row-actions";
import { defaultHeaderMeta } from "@/types";
import { t } from "@/utils/locale";
import { statusValue, statusBadges } from "@/types/system";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTableColumnType } from "@/components/DataTable";
import { FacetedFilter } from "@/components/DataTable/faceted-filter";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.User>[] = [
  {
    accessorKey: "id",
    header: t("pages.system.users.columns.id"),
    cell: ({ row }) => <LongText className='max-w-42'>{row.original.id}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: t("pages.system.users.columns.username"),
    cell: ({ row }) => <LongText className='max-w-36'>{row.original.username}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
    cell: ({ row }) => <LongText className='max-w-36'>{row.original.nickname}</LongText>,
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
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.original.email}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.original.phone}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || 0;
      const badgeColor = statusBadges.get(status);
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
    accessorKey: "last_login_time",
    header: "Last Login Time",
    cell: ({ row }) => <div>{row.original.last_login_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  // {
  //   accessorKey: "update_time",
  //   header: "Update Time",
  //   cell: ({ row }) => <div>{row.original.update_time}</div>,
  //   meta: defaultHeaderMeta.meta,
  //   enableSorting: false,
  //   hiddenInTable: true,
  // },
  {
    id: "actions",
    header: "Actions",
    cell: UserIconRowActions,
    meta: defaultHeaderMeta.meta,
  },
];
