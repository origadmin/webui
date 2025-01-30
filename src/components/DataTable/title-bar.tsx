import { Fragment, JSX } from "react";
import { userTypes } from "@/mocks/user/data";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolbarProps } from "@/components/DataTable/toolbar";
import { FacetedFilter } from "./faceted-filter";
import { ViewOptions } from "./view-options";

export interface TitleBarProps<TData> {
  table: Table<TData>;
  toolbars?: ToolbarProps["toolbars"];
  showSearch?: boolean;
  showStatistics?: boolean;
  statisticsRender?: () => JSX.Element;
}

export function TitleBar<TData>({
  table,
  toolbars,
  showSearch,
  showStatistics,
  statisticsRender,
}: TitleBarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const renderSearchBar = () => (
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
  const renderStatistics = () => (
    <div className='hidden px-2 flex-1 text-sm text-muted-foreground sm:block'>
      {table.getFilteredRowModel().rows.length} pieces of data found.
    </div>
  );

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {showStatistics && (statisticsRender ? statisticsRender() : renderStatistics())}
        {showSearch && renderSearchBar()}
      </div>
      <div className='flex gap-2'>
        {toolbars}
        <ViewOptions table={table} />
      </div>
    </div>
  );
}
