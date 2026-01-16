import { UserIconRowActions } from "@/pages/system/user/components/users-row-actions";
import { t } from "@/utils/locale";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableColumnType } from "@/components/DataTable";
import { headerMeta } from "@/components/DataTable/column-defaults";
import { actionsColumn, systemStatusColumn } from "@/components/DataTable/common-columns";
import { TextInputFilter } from "@/components/DataTable/filters";
import LongText from "@/components/long-text";

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
    ...headerMeta("w-[40px] px-2"),
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
    cell: ({ row }) => <LongText>{row.original.nickname}</LongText>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Nickname"),
  },
  {
    accessorKey: "username",
    header: t("pages.system.users.columns.username"),
    cell: ({ row }) => <LongText>{row.original.username}</LongText>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Username"),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Email"),
  },
  systemStatusColumn(),
  actionsColumn(({ row }) => <UserIconRowActions row={row} />),
];
