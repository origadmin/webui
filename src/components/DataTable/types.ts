import { ComponentType, ReactNode } from "react";
import {
  ColumnDef,
  Table as ReactTable,
  ColumnMeta,
  RowData,
  Column,
} from "@tanstack/react-table";

export type ColumnType<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  accessorKey?: string;
  renderSearch?: (
    columnDef: ColumnType<TData, TValue>,
    index: number,
    table: ReactTable<TData>
  ) => ReactNode;
  filterComponent?: (
    column: Column<TData, TValue>,
    table: ReactTable<TData>
  ) => ReactNode;
  headerTitle?: string;
  hiddenInTable?: boolean;
  hiddenInSearch?: boolean;
  searchComponent?: ComponentType<{ column: Column<TData> }>;
  meta: ColumnMeta<TData, TValue>;
};
