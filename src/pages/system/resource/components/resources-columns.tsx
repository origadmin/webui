import { Badge } from "@/components/ui/badge";
import { DataTableColumnType } from "@/components/DataTable";
import LongText from "@/components/long-text";
import { defaultHeaderMeta } from "@/types";
import { statusBadges, statusValue } from "@/types/system";
import { cn } from "@/lib/utils";
import { ResourceRowActions } from "./resources-row-actions";

// Maps sync_status to badge variants
const syncStatusBadges: Record<string, string> = {
  Synced: "bg-green-500",
  Modified: "bg-yellow-500",
  Conflict: "bg-red-500",
  Orphaned: "bg-gray-500",
};

export const columns: DataTableColumnType<API.System.Resource>[] = [
  {
    accessorKey: "service_name",
    header: "Service Name",
    cell: ({ row }) => <LongText>{row.original.service_name}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => <LongText>{row.original.keyword}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => <LongText>{row.original.path}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => <Badge variant='outline'>{row.original.method}</Badge>,
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "sync_status",
    header: "Sync Status",
    cell: ({ row }) => {
      const status = row.original.sync_status || "Unknown";
      return <Badge className={cn(syncStatusBadges[status])}>{status}</Badge>;
    },
    meta: defaultHeaderMeta.meta,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || 0;
      const badgeColor = statusBadges.get(status);
      return (
        <Badge variant='outline' className={cn("capitalize", badgeColor)}>
          {statusValue[status]}
        </Badge>
      );
    },
    meta: defaultHeaderMeta.meta,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ResourceRowActions row={row} />,
    meta: defaultHeaderMeta.meta,
  },
];
