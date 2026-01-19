import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader, DataTableColumnType } from "@/components/DataTable";
import { headerMeta } from "@/components/DataTable/column-defaults";
import { actionsColumn, systemStatusColumn } from "@/components/DataTable/common-columns";
import { TextInputFilter } from "@/components/DataTable/filters";
import LongText from "@/components/long-text";
import { ResourceIconRowActions } from "./resources-row-actions";

// Maps sync_status to badge variants
const syncStatusBadges: Record<string, string> = {
  Synced: "bg-green-500",
  Modified: "bg-yellow-500",
  Conflict: "bg-red-500",
  Orphaned: "bg-gray-500",
};

const methodColors: Record<string, string> = {
  GET: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  POST: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  PUT: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
  DELETE: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  PATCH: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  HEAD: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  OPTIONS: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100",
};

export const columns: DataTableColumnType<API.System.Resource>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => (
      <div className='flex items-center'>
        <LongText>{row.original.name}</LongText>
        {row.original.service_name && (
          <span className='ml-2 text-xs text-muted-foreground'>({row.original.service_name})</span>
        )}
      </div>
    ),
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Name"),
  },
  {
    accessorKey: "keyword",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Keyword' />,
    cell: ({ row }) => <LongText>{row.original.keyword}</LongText>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Keyword"),
  },
  {
    accessorKey: "path",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Path' />,
    cell: ({ row }) => <LongText>{row.original.path}</LongText>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Path"),
  },
  {
    accessorKey: "method",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Method' />,
    cell: ({ row }) => {
      const method = (row.original.method || "").toUpperCase();
      const colorClass = methodColors[method] || "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100";
      return (
        <Badge variant='outline' className={cn("font-mono", colorClass)}>
          {method || "ANY"}
        </Badge>
      );
    },
    ...headerMeta(),
  },
  {
    accessorKey: "sequence",
    header: "Sequence",
    cell: ({ row }) => <div>{row.original.sequence}</div>,
    ...headerMeta(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <LongText>{row.original.description}</LongText>,
    ...headerMeta(),
  },
  systemStatusColumn(),
  {
    accessorKey: "sync_status",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Sync Status' />,
    cell: ({ row }) => {
      const status = row.original.sync_status || "Unknown";
      return <Badge className={cn(syncStatusBadges[status])}>{status}</Badge>;
    },
    ...headerMeta(),
  },
  actionsColumn(({ row }) => <ResourceIconRowActions row={row} />),
];
