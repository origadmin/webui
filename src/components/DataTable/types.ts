import { ComponentType, ReactNode } from "react";
import { Column, ColumnDef, ColumnMeta, Table as ReactTable } from "@tanstack/react-table";

export type ColumnType<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  renderSearch?: (columnDef: ColumnType<TData, TValue>, index: number, table: ReactTable<TData>) => ReactNode;
  filterComponent?: (column: Column<TData, TValue>, table: ReactTable<TData>) => ReactNode;
  headerTitle?: string;
  hiddenInTable?: boolean;
  hiddenInSearch?: boolean;
  searchComponent?: ComponentType<{ column: Column<TData> }>;
  meta: ColumnMeta<TData, TValue>;
};
