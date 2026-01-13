import { Fragment, ReactNode } from "react";
import { Column, flexRender, HeaderContext, HeaderGroup, Renderable, Row } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ColumnHeader } from "./column-header";
import { ColumnType } from "./types";

const renderHeader = <TData, TValue>(column: Column<TData>): Renderable<HeaderContext<TData, TValue>> => {
  const columnDef = column.columnDef as ColumnType<TData, TValue>;
  if (columnDef.headerTitle) {
    return <ColumnHeader column={column} title={columnDef.headerTitle} />;
  }
  return column.columnDef.header;
};

export const renderRow = <TData,>(groups: HeaderGroup<TData>[]) => {
  return groups.map((headerGroup) => (
    <TableRow key={headerGroup.id} className='group/row'>
      {headerGroup.headers.map((header) => {
        return (
          <TableHead key={header.id} colSpan={header.colSpan} className={header.column.columnDef.meta?.className ?? ""}>
            {header.isPlaceholder ? null : flexRender(renderHeader(header.column), header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  ));
};

const dataState = <TData,>(row: Row<TData>) => {
  if (row.getCanExpand()) {
    return row.getIsExpanded() ? "expanded" : "collapsed";
  }
  if (row.getCanSelect()) {
    return row.getIsSelected() ? "selected" : "";
  }
  return undefined;
};

export const renderCell = <TData,>(
  rows: Row<TData>[],
  renderSubComponent?: (props: { row: Row<TData> }) => ReactNode,
): ReactNode => {
  return rows.map((row) => (
    <Fragment key={row.id}>
      <TableRow data-state={dataState(row)} className='group/row'>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className={cn("px-4", cell.column.columnDef.meta?.className)}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      {row.getIsExpanded() && renderSubComponent && (
        <TableRow>
          <TableCell colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</TableCell>
        </TableRow>
      )}
    </Fragment>
  ));
};
