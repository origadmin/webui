import { JSX } from "react";
import { t } from "@/utils/locale";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { ToolbarProps, Toolbar } from "src/components/DataTable/toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PaginationProps<T> {
  table: Table<T>;
  toolbar?: ToolbarProps<T>;
  sizeOptions?: string[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  position?: "top" | "bottom";
  rowSelect?: boolean;
  rowSelectRender?: (table: Table<T>) => JSX.Element;
}

const renderSizeOptions = <TData,>(table: Table<TData>, _sizeOptions?: string[]) => {
  const pageCount = table.getPageCount();
  const { pageSize, pageIndex: _pageIndex = 0 } = table.getState().pagination;
  const pageIndex = pageCount === 0 ? 0 : _pageIndex + 1;
  console.log("page", pageSize, _pageIndex);

  return (
    <div className='flex items-center sm:space-x-6 lg:space-x-8'>
      <div className='flex items-center space-x-2 md:p-2'>
        <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side='top'>
            {_sizeOptions &&
              _sizeOptions.map((pageSize) => (
                <SelectItem key={Number(pageSize)} value={`${pageSize}`}>
                  {Number(pageSize)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex w-[120px] items-center justify-center text-sm font-medium'>
        Page {pageIndex} of {pageCount}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to first page</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to last page</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

// const renderToolbar = (toolbars?: JSX.Element) => {
//   return <div className='flex items-center space-x-2 px-2'>{toolbars}</div>;
// };

const renderRowSelect = <TData,>(table: Table<TData>) => {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;

  return (
    <div className='flex text-sm text-muted-foreground sm:space-x-6 lg:space-x-8'>
      {t("components.pagination.row_select", { selectedCount, totalCount })}
    </div>
  );
};

export function Pagination<T>({
  table,
  sizeOptions = [],
  showSizeChanger = true,
  // showQuickJumper = true,
  toolbar,
  rowSelect = true,
  rowSelectRender,
}: PaginationProps<T>) {
  console.log("state", table.getState().pagination);
  rowSelectRender = rowSelectRender || renderRowSelect;
  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      {rowSelect && rowSelectRender(table)}
      {showSizeChanger && sizeOptions ? renderSizeOptions(table, sizeOptions) : null}
      <Toolbar {...toolbar} table={table} />
    </div>
  );
}
