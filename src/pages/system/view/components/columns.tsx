"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader, DataTableColumnType } from "@/components/DataTable";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import LongText from "@/components/long-text";
import { defaultHeaderMeta } from "@/types";
import { statusBadges, statusValue } from "@/types/system";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { RowActions } from "./row-actions";

export const columns: DataTableColumnType<API.System.View>[] = [
  {
    accessorKey: "name",
    header: ({ column, table }) => (
      <div className='flex items-center gap-1.5 min-w-[100px] overflow-x-auto no-scrollbar'>
        {table.getRowModel().rows.length > 0 && (
          <Checkbox
            checked={table.getIsAllRowsExpanded() || (table.getIsSomeRowsExpanded() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllRowsExpanded(!!value)}
            aria-label='Select all'
          />
        )}
        <DataTableColumnHeader className='px-2' column={column} title='Name' />
      </div>
    ),
    searchable: true,
    meta: defaultHeaderMeta.meta,
    cell: ({ row }) => {
      return (
        <div className='flex items-center min-w-24' style={{ paddingLeft: `${row.depth}rem` }}>
          {row.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()} className='mr-2'>
              {row.getIsExpanded() ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
            </button>
          ) : (
            <span className='w-6' />
          )}
          <LongText className='px-2 max-w-48 flex items-center overflow-x-auto no-scrollbar'>
            {row.original.icon && row.original.icon !== "" ? (
              <TablerIcon className='mr-2' name={row.original.icon} />
            ) : null}
            {row.getValue("name")}
          </LongText>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    searchable: true,
    cell: ({ row }) => <LongText className='max-w-60'>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => <Badge variant='outline'>{row.original.scope}</Badge>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant='outline'>{row.original.type}</Badge>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => <LongText>{row.original.path}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div>{row.original.sequence}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "visible",
    header: "Visible",
    cell: ({ row }) => <div>{row.original.visible ? "Yes" : "No"}</div>,
    meta: defaultHeaderMeta.meta,
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
    meta: defaultHeaderMeta.meta,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowActions row={row} />,
    meta: defaultHeaderMeta.meta,
  },
];
