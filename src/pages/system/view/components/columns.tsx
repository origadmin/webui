import { ChevronDown, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader, DataTableColumnType } from "@/components/DataTable";
import { headerMeta } from "@/components/DataTable/column-defaults";
import { actionsColumn, systemStatusColumn } from "@/components/DataTable/common-columns";
import { TextInputFilter } from "@/components/DataTable/filters";
import TablerIcon from "@/components/IconPicker/tabler-icon";
import { ColorBadge } from "@/components/color-badge";
import LongText from "@/components/long-text";
import { scopeOptions } from "../constants";
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
            aria-label='Toggle All Expanded'
          />
        )}
        <DataTableColumnHeader className='px-2' column={column} title='Name' />
      </div>
    ),
    ...headerMeta(),
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
    filterComponent: (column) => TextInputFilter(column, "Name"),
  },
  {
    accessorKey: "keyword",
    header: "Keyword",
    cell: ({ row }) => <LongText className='max-w-60'>{row.getValue("keyword")}</LongText>,
    ...headerMeta(),
    filterComponent: (column) => TextInputFilter(column, "Keyword"),
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => {
      const scope = row.original.scope;
      const label = scopeOptions.find((option) => option.value === scope)?.label || scope;
      return <ColorBadge colorKey={scope}>{label}</ColorBadge>;
    },
    ...headerMeta(),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return <ColorBadge colorKey={type}>{type}</ColorBadge>;
    },
    ...headerMeta(),
  },
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => <LongText>{row.original.path}</LongText>,
    ...headerMeta(),
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
  systemStatusColumn(),
  actionsColumn(({ row }) => <RowActions row={row} />),
];
