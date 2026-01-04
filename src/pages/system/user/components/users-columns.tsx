import { UserIconRowActions } from "@/pages/system/user/components/users-row-actions";
import { defaultHeaderMeta } from "@/types";
import { t } from "@/utils/locale";
import { systemStatusColumn } from "@/components/DataTable/common-columns";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

export const columns: DataTableColumnType<API.System.User>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()}
          className="h-8 w-8 p-0"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
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
    searchable: true,
  },
  {
    accessorKey: "username",
    header: t("pages.system.users.columns.username"),
    cell: ({ row }) => <LongText>{row.original.username}</LongText>,
    meta: defaultHeaderMeta.meta,
    searchable: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
    meta: defaultHeaderMeta.meta,
    searchable: true,
  },
  systemStatusColumn,
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserIconRowActions row={row} />,
    meta: defaultHeaderMeta.meta,
  },
];
