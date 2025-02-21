import { Fragment, JSX } from "react";
import { userTypes } from "@/mocks/user/data";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolbarProps, Toolbar } from "@/components/DataTable/toolbar";
import { FacetedFilter } from "./faceted-filter";
import { ViewOptions } from "./view-options";

export interface TitleBarProps<TData> {
  table: Table<TData>;
  toolbars?: ToolbarProps<TData>;
  showSearch?: boolean;
  showOption?: boolean;
  showStatistics?: boolean;
  total?: number;
  statisticsRender?: (total: number, filtered?: number) => JSX.Element;
  searchRender?: (table: Table<TData>) => JSX.Element;
}

const renderSearchBar = <TData,>(table: Table<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <Fragment>
      <Input
        placeholder='Filter users...'
        value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("username")?.setFilterValue(event.target.value)}
        className='h-8 w-[150px] lg:w-[250px]'
      />
      <div className='flex gap-x-2'>
        {table.getColumn("status") && (
          <FacetedFilter
            column={table.getColumn("status")}
            title='Status'
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Invited", value: "invited" },
              { label: "Suspended", value: "suspended" },
            ]}
          />
        )}
        {table.getColumn("role") && (
          <FacetedFilter
            column={table.getColumn("role")}
            title={table.getColumn("role")?.id}
            options={userTypes.map((t) => ({ ...t }))}
          />
        )}
      </div>
      {isFiltered && (
        <Button variant='ghost' onClick={() => table.resetColumnFilters()} className='h-8 px-2 lg:px-3'>
          Reset
          <Cross2Icon className='ml-2 h-4 w-4' />
        </Button>
      )}
    </Fragment>
  );
};

const renderStatistics = (total: number) => (
  <div className='hidden px-2 flex-1 text-sm text-muted-foreground sm:block'>{total} pieces of data found.</div>
);

export function TitleBar<TData>({
  table,
  toolbars,
  showSearch,
  showOption = true,
  showStatistics,
  statisticsRender = renderStatistics,
  searchRender = renderSearchBar,
  total,
}: TitleBarProps<TData>) {
  total = total || table.getFilteredRowModel().rows.length;
  const selected = table.getSelectedRowModel().rows.length;
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {showStatistics && statisticsRender(total, selected)}
        {showSearch && searchRender(table)}
      </div>
      {/*<div className="flex gap-2">{renderToolbar(table, toolbars)}</div>*/}
      <Toolbar {...toolbars} table={table} external={showOption && <ViewOptions table={table} />} />
    </div>
  );
}
