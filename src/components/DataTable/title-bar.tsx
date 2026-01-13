import { JSX, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Toolbar, ToolbarProps } from "@/components/DataTable/toolbar";
import { ViewOptions } from "./view-options";

export interface TitleBarProps<TData> {
  table: Table<TData>;
  toolbar?: Omit<ToolbarProps<TData>, "table">;
  total?: number;
  statistics?: boolean | ((total: number, filtered?: number) => JSX.Element);
  showOption?: boolean;
}

const renderStatistics = (total: number) => (
  <div className='hidden px-2 flex-1 text-sm text-muted-foreground sm:block'>{total} pieces of data found.</div>
);

export function TitleBar<TData>({ table, toolbar, showOption = true, statistics, total }: TitleBarProps<TData>) {
  total = total || table.getFilteredRowModel().rows.length;
  const selected = table.getSelectedRowModel().rows.length;
  const statisticsRender = statistics ? (typeof statistics === "function" ? statistics : renderStatistics) : undefined;

  const toolbarExternal = useMemo(() => {
    const options = showOption ? <ViewOptions table={table} /> : undefined;
    if (options && toolbar && toolbar.external) {
      if (typeof toolbar.external === "function") {
        return toolbar.external([options]);
      } else {
        if (Array.isArray(toolbar.external)) {
          return [...toolbar.external, options];
        }
        return [toolbar.external, options];
      }
    }
    return options;
  }, [showOption, table, toolbar]);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {statisticsRender && statisticsRender(total, selected)}
      </div>
      <Toolbar {...toolbar} table={table} external={toolbarExternal} />
    </div>
  );
}
