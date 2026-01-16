import { UserIconRowActions } from "@/pages/system/user/components/users-row-actions";
import { defaultHeaderMeta } from "@/types";
import { t } from "@/utils/locale";
import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export const columns: DataTableColumnType<API.System.User>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button variant='ghost' size='icon' onClick={row.getToggleExpandedHandler()} className='h-8 w-8 p-0'>
          {row.getIsExpanded() ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
        </Button>
      ) : null;
    },
    meta: {
      className: "w-[40px] px-2",
    },
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
    cell: ({ row }) => <LongText>{row.original.nickname}</LongText>,
    meta: defaultHeaderMeta.meta,
    filterComponent: (column) => textInputFilter(column, "Nickname"),
  },
  {
    accessorKey: "username",
    header: t("pages.system.users.columns.username"),
    cell: ({ row }) => <LongText>{row.original.username}</LongText>,
    meta: defaultHeaderMeta.meta,
    filterComponent: (column) => textInputFilter(column, "Username"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
    meta: defaultHeaderMeta.meta,
    filterComponent: (column) => textInputFilter(column, "Email"),
  },
  systemStatusColumn(),
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserIconRowActions row={row} />,
    meta: defaultHeaderMeta.meta,
    pin: "right",
  },
];
