import React, { JSX, ReactNode, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";

interface SystemManagementPageProps<T> {
  title: string;
  description: string;
  columns: DataTableProps<T>["columns"];
  useQuery: (params: API.DataTableParams) => UseQueryResult<API.Result<T>>;
  PrimaryButtons: () => JSX.Element;
  Dialogs: () => JSX.Element;
  TableProvider: React.FC<{ children: ReactNode }>;
}

export function SystemManagementPage<T>({
  title,
  description,
  columns,
  useQuery,
  PrimaryButtons,
  Dialogs,
  TableProvider,
}: SystemManagementPageProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 15 });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const queryParams: API.DataTableParams = {
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    // Add sorting parameters
    ...(sorting.length > 0 && {
      sortField: sorting[0].id,
      sortOrder: sorting[0].desc ? "desc" : "asc",
    }),
    // Add column filters as dynamic properties
    ...columnFilters.reduce(
      (acc, filter) => {
        if (filter.value) {
          acc[filter.id] = filter.value;
        }
        return acc;
      },
      {} as Record<string, unknown>,
    ),
  };

  const { data: queryResult, isLoading }: UseQueryResult<API.Result<T>> = useQuery(queryParams);

  const data = queryResult || { items: [], total: 0 };

  const handleSearch = () => {
    // Implement search logic if needed, or rely on query re-fetch
  };

  const handleReset = () => {
    setColumnFilters([]);
    setSorting([]);
    setPagination({ pageIndex: 0, pageSize: 15 });
  };

  const tableProps: Omit<DataTableProps<T>, "isLoading" | "dataSource" | "total"> = {
    columns,
    useManual: true,
    showPagination: true,
    sorting,
    setSorting,
    paginationState: pagination,
    setPagination,
    columnFiltersState: columnFilters,
    setColumnFilters,
    toolbarPosition: "bottom",
    toolbars: () => <PrimaryButtons />,
    props: {
      search: {
        onSearch: handleSearch,
        onReset: handleReset,
      },
    },
  };

  return (
    <TableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<T>
                {...tableProps}
                isLoading={isLoading}
                dataSource={data?.items || []}
                total={data?.total || 0}
              />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <Dialogs />
    </TableProvider>
  );
}
