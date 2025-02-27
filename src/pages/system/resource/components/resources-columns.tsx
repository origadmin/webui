import { ResourceIconRowActions } from "@/pages/system/resource/components/resources-row-actions";
import { defaultHeaderMeta } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { statusValue, statusBadges } from "@/types/system";
import { resourceTypeValues } from "@/types/system/resource";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader, DataTableColumnType } from "@/components/DataTable";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Resource>[] = [
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{resourceTypeValues.get(row.getValue("type"))}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("sequence")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status = 0 } = row.original;
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
    meta: defaultHeaderMeta.meta,
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "visible",
    header: "Visible",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("visible") ? "Yes" : "No"}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "create_time",
    header: "Create Time",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.original.create_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
  },
  {
    accessorKey: "update_time",
    header: "Update Time",
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.original.update_time}</div>,
    meta: defaultHeaderMeta.meta,
    enableSorting: false,
    hiddenInTable: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className='flex min-w-[100px] overflow-x-auto no-scrollbar'>
        <ResourceIconRowActions row={row} />
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
];
