"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<API.System.View>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
  },
  {
    accessorKey: "path",
    header: "Path",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant='outline'>{row.original.type}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status === 1;
      return <Badge variant={isActive ? "default" : "destructive"}>{isActive ? "Active" : "Inactive"}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
