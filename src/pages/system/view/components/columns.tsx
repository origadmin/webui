"use client";

import { defaultHeaderMeta } from "@/types";
import { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColorBadge } from "@/components/ui/color-badge";
import { Input } from "@/components/ui/input";
import { DataTableColumnHeader, DataTableColumnType } from "@/components/DataTable";
import { systemStatusColumn } from "@/components/DataTable/common-columns";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import LongText from "@/components/long-text";
import { scopeOptions } from "../constants";
import { RowActions } from "./row-actions";


// Helper function to create a simple text input filter
const textInputFilter = (column: Column<any, unknown>, title: string) => (
  <Input
    placeholder={`Search ${title}...`}
    value={(column.getFilterValue() as string) ?? ""}
    onChange={(event) => column.setFilterValue(event.target.value)}
    className='h-8 w-[150px] lg:w-[250px]'
  />
);

export const columns: DataTableColumnType<API.System.View>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column, table }) => (
      <div className='flex items-center gap-1.5 min-w-[100px] overflow-x-auto no-scrollbar'>
        {table.getRowModel().rows.length > 0 && (
          <Checkbox
            checked={table.getIsAllRowsExpanded() || (table.getIsSomeRowsExpanded() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllRowsExpanded(!!value)}
            aria-label='Toggle All Expanded'
          />
        )}
        <DataTableColumnHeader className='px-2' column={column} title='Name' />
      </div>
    ),
    meta: defaultHeaderMeta.meta,
    cell: ({ row }) => (
      <div className='flex items-center min-w-24' style={{ paddingLeft: `${row.depth}rem` }}>
        {row.getCanExpand() ? (
          <button onClick={row.getToggleExpandedHandler()} className='mr-2'>
            {row.getIsExpanded() ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
          </button>
        ) : (
          <span className='w-6 mr-2' /> // Placeholder for alignment
        )}
        <LongText className='px-2 max-w-48 flex items-center overflow-x-auto no-scrollbar'>
          {row.original.icon && <TablerIcon className='mr-2 h-4 w-4 flex-shrink-0' name={row.original.icon} />}
          {row.getValue("name")}
        </LongText>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    filterComponent: (column) => textInputFilter(column, "Name"),
  },
  {
    id: "keyword",
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => <LongText className='max-w-60'>{row.getValue("keyword")}</LongText>,
    meta: defaultHeaderMeta.meta,
    filterComponent: (column) => textInputFilter(column, "Keyword"),
  },
  {
    id: "scope",
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => {
      const scope = row.original.scope;
      const label = scopeOptions.find((option) => option.value === scope)?.label || scope;
      return <ColorBadge colorKey={scope}>{label}</ColorBadge>;
    },
    meta: defaultHeaderMeta.meta,
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return <ColorBadge colorKey={type}>{type}</ColorBadge>;
    },
    meta: defaultHeaderMeta.meta,
  },
  {
    id: "path",
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => <LongText>{row.original.path}</LongText>,
    meta: defaultHeaderMeta.meta,
  },
  // {
  //   accessorKey: "component",
  //   header: "Component",
  //   cell: ({ row }) => <LongText>{row.original.component}</LongText>,
  //   meta: defaultHeaderMeta.meta,
  // },
  // {
  //   accessorKey: "sequence",
  //   header: "Sequence",
  //   cell: ({ row }) => <div>{row.original.sequence}</div>,
  //   meta: defaultHeaderMeta.meta,
  // },
  // {
  //   accessorKey: "visible",
  //   header: "Visible",
  //   cell: ({ row }) => <div>{row.original.visible ? "Yes" : "No"}</div>,
  //   meta: defaultHeaderMeta.meta,
  // },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   cell: ({ row }) => <LongText>{row.original.description}</LongText>,
  //   meta: defaultHeaderMeta.meta,
  // },
  systemStatusColumn,
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RowActions row={row} />,
    meta: defaultHeaderMeta.meta,
  },
];
