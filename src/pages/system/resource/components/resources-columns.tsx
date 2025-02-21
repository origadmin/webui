import { ResourceIconRowActions } from "@/pages/system/resource/components/resources-row-actions";
import { defaultHeaderMeta } from "@/types";
import { icons } from "@tabler/icons-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { statusValue, statusBadges } from "@/types/system";
import { resourceTypeValues } from "@/types/system/resource";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";

export const columns: DataTableColumnType<API.System.Resource>[] = [
  {
    id: "expand",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsExpanded() || (table.getIsSomeRowsExpanded() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllRowsExpanded(!!value)}
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
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          {row.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()} className='mr-2'>
              {row.getIsExpanded() ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
            </button>
          ) : (
            <span className='w-6' />
          )}
        </div>
      );
    },

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    searchable: true,
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Resourcename' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("name")}</LongText>,
    meta: defaultHeaderMeta.meta,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    searchable: true,
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Nickname' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "type",
    header: "Type",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => (
      <div className='w-fit max-w-36 text-nowrap'>
        {resourceTypeValues.get(row.getValue("type")) || row.getValue("type")}
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "method",
    header: "Method",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("method")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "path",
    header: "Path",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("path")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "operation",
    header: "Operation",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("operation")}</div>,
    meta: defaultHeaderMeta.meta,
  },

  {
    accessorKey: "component",
    header: "Component",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("component")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => {
      const iconValue = row.getValue("icon") as keyof typeof icons | undefined;
      const IconComponent = iconValue ? icons[iconValue] : null;

      return <div className='w-fit max-w-36 text-nowrap'>{IconComponent ? <IconComponent /> : "-"}</div>;
    },
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("sequence")}</div>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "status",
    header: "Status",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
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
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("visible") ? "Yes" : "No"}</div>,
    meta: defaultHeaderMeta.meta,
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   // header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
  //   cell: ({ row }) => <div className='w-fit max-w-36 text-nowrap'>{row.getValue("description")}</div>,
  //   meta: defaultHeaderMeta.meta,
  // },
  {
    id: "actions",
    header: "Actions",
    // header: ({ column }) => <DataTableColumnHeader column={column} title='Options' />,
    cell: ({ row }) => (
      <div className='flex gap-1.5 min-w-[100px] overflow-x-auto no-scrollbar'>
        <ResourceIconRowActions row={row} />
      </div>
    ),
    meta: defaultHeaderMeta.meta,
  },
];
